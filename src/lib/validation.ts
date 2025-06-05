import { z } from 'zod'

// Checkout session validation schema
export const checkoutSessionSchema = z.object({
  planType: z.enum(['basic', 'essential', 'growth'], {
    errorMap: () => ({ message: 'Ongeldig plan type' })
  }),
  billingCycle: z.enum(['monthly', 'annually'], {
    errorMap: () => ({ message: 'Ongeldig billing cycle' })
  }),
})

// Webhook event validation schemas
export const stripeWebhookEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  data: z.object({
    object: z.record(z.any()),
  }),
  created: z.number(),
})

// Subscription metadata validation
export const subscriptionMetadataSchema = z.object({
  planType: z.enum(['basic', 'essential', 'growth']),
  billingCycle: z.enum(['monthly', 'annually']),
  userId: z.string().optional(),
})

// User subscription update schema
export const userSubscriptionUpdateSchema = z.object({
  stripe_customer_id: z.string(),
  subscription_status: z.enum(['active', 'canceled', 'past_due', 'incomplete', 'trialing']),
  subscription_plan: z.enum(['basic', 'essential', 'growth']).optional(),
  subscription_period_end: z.date().optional(),
})

// Helper function for safe validation
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  try {
    const result = schema.parse(data)
    return { success: true, data: result }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map((err: z.ZodIssue) => 
        `${err.path.join('.')}: ${err.message}`
      ).join(', ')
      return { success: false, error: errorMessages }
    }
    return { success: false, error: 'Validatie fout' }
  }
} 