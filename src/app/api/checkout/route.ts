import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG, PRICING_PLANS } from '@/lib/stripe'
import { validateData, checkoutSessionSchema } from '@/lib/validation'
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limiter'
import { trackCheckoutCompleted } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    // Debug environment variables
    console.log('🔍 DEBUG Environment Variables:', {
      hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
      secretKeyLength: process.env.STRIPE_SECRET_KEY?.length,
      secretKeyStart: process.env.STRIPE_SECRET_KEY?.substring(0, 10),
      secretKeyEnd: process.env.STRIPE_SECRET_KEY?.substring(-10),
      hasPublishableKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      publishableKeyLength: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.length,
    })

    // Rate limiting
    const clientId = getClientIdentifier(request)
    const rateLimitResult = rateLimit(clientId, RATE_LIMITS.checkout)
    
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          error: 'Te veel checkout pogingen. Probeer het later opnieuw.',
          rateLimitExceeded: true,
          resetTime: rateLimitResult.resetTime 
        },
        { status: 429 }
      )
    }

    // Parse en valideer request body
    const body = await request.json()
    console.log('📋 Request body:', body)
    
    const validation = validateData(checkoutSessionSchema, body)
    
    if (!validation.success) {
      console.log('❌ Validation failed:', validation.error)
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    const { planType, billingCycle } = validation.data
    const plan = PRICING_PLANS[planType]
    const priceData = plan[billingCycle]

    console.log('💰 Price data:', {
      planType,
      billingCycle,
      priceId: priceData.priceId,
      price: priceData.price
    })

    // Checkout session aanmaken met Price ID's
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'ideal'],
      line_items: [
        {
          price: priceData.priceId, // Gebruik Price ID in plaats van price_data
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: STRIPE_CONFIG.success_url,
      cancel_url: STRIPE_CONFIG.cancel_url,
      metadata: {
        planType,
        billingCycle,
        clientId,
      },
      billing_address_collection: 'auto',
      allow_promotion_codes: true,
      // Automatic tax uitgeschakeld voor nu
      // automatic_tax: {
      //   enabled: true,
      // },
      // tax_id_collection: {
      //   enabled: true,
      // },
    })

    // Log successful session creation
    console.log('✅ Checkout session created:', {
      sessionId: session.id,
      planType,
      billingCycle,
      priceId: priceData.priceId,
      clientId,
    })

    return NextResponse.json({ 
      sessionId: session.id, 
      url: session.url,
      rateLimitRemaining: rateLimitResult.remaining 
    })
  } catch (error) {
    console.error('💥 Checkout session error:', error)
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('🔥 Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString(),
      })
      
      // Log Stripe specific errors
      if ('type' in error) {
        console.error('🔵 Stripe error details:', {
          type: (error as any).type,
          code: (error as any).code,
          statusCode: (error as any).statusCode,
          raw: (error as any).raw
        })
      }
    }
    
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het aanmaken van de checkout sessie' },
      { status: 500 }
    )
  }
} 