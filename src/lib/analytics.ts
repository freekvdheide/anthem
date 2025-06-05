// Simple analytics tracking for payment events
// Voor productie zou je Google Analytics, Mixpanel, etc. gebruiken

export interface AnalyticsEvent {
  event: string
  properties: Record<string, string | number | boolean | null | undefined>
  timestamp: number
  userId?: string
  sessionId?: string
}

// In-memory store voor demo purposes
const analyticsStore: AnalyticsEvent[] = []

export function track(event: string, properties: Record<string, string | number | boolean | null | undefined> = {}, userId?: string) {
  const analyticsEvent: AnalyticsEvent = {
    event,
    properties,
    timestamp: Date.now(),
    userId,
    sessionId: generateSessionId(),
  }
  
  // Store event
  analyticsStore.push(analyticsEvent)
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', analyticsEvent)
  }
  
  // In productie zou je hier naar je analytics service sturen
  // await sendToAnalyticsProvider(analyticsEvent)
}

// Payment specific tracking events
export const PAYMENT_EVENTS = {
  CHECKOUT_INITIATED: 'checkout_initiated',
  CHECKOUT_COMPLETED: 'checkout_completed',
  CHECKOUT_FAILED: 'checkout_failed',
  CHECKOUT_CANCELLED: 'checkout_cancelled',
  SUBSCRIPTION_CREATED: 'subscription_created',
  SUBSCRIPTION_UPDATED: 'subscription_updated',
  SUBSCRIPTION_CANCELLED: 'subscription_cancelled',
  PAYMENT_SUCCEEDED: 'payment_succeeded',
  PAYMENT_FAILED: 'payment_failed',
  REFUND_CREATED: 'refund_created',
} as const

export type PaymentEvent = keyof typeof PAYMENT_EVENTS

// Helper functions for common tracking scenarios
export function trackCheckoutInitiated(planType: string, billingCycle: string, userId?: string) {
  track(PAYMENT_EVENTS.CHECKOUT_INITIATED, {
    plan_type: planType,
    billing_cycle: billingCycle,
    page: 'pricing',
  }, userId)
}

export function trackCheckoutCompleted(
  planType: string, 
  billingCycle: string, 
  amount: number,
  currency: string,
  userId?: string
) {
  track(PAYMENT_EVENTS.CHECKOUT_COMPLETED, {
    plan_type: planType,
    billing_cycle: billingCycle,
    amount,
    currency,
    success: true,
  }, userId)
}

export function trackCheckoutFailed(
  planType: string, 
  billingCycle: string, 
  error: string,
  userId?: string
) {
  track(PAYMENT_EVENTS.CHECKOUT_FAILED, {
    plan_type: planType,
    billing_cycle: billingCycle,
    error,
    success: false,
  }, userId)
}

export function trackSubscriptionEvent(
  eventType: PaymentEvent,
  subscriptionId: string,
  planType?: string,
  userId?: string
) {
  track(eventType, {
    subscription_id: subscriptionId,
    plan_type: planType,
  }, userId)
}

// Session management
function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Analytics dashboard helpers
export function getAnalytics(startDate?: Date, endDate?: Date) {
  const start = startDate?.getTime() || 0
  const end = endDate?.getTime() || Date.now()
  
  return analyticsStore.filter(event => 
    event.timestamp >= start && event.timestamp <= end
  )
}

export function getConversionMetrics() {
  const checkoutInitiated = analyticsStore.filter(e => e.event === PAYMENT_EVENTS.CHECKOUT_INITIATED).length
  const checkoutCompleted = analyticsStore.filter(e => e.event === PAYMENT_EVENTS.CHECKOUT_COMPLETED).length
  
  return {
    initiated: checkoutInitiated,
    completed: checkoutCompleted,
    conversionRate: checkoutInitiated > 0 ? (checkoutCompleted / checkoutInitiated) * 100 : 0,
  }
}

export function getPopularPlans() {
  const planCounts: Record<string, number> = {}
  
  analyticsStore
    .filter(e => e.event === PAYMENT_EVENTS.CHECKOUT_COMPLETED)
    .forEach(event => {
      const planType = event.properties.plan_type
      if (typeof planType === 'string') {
        planCounts[planType] = (planCounts[planType] || 0) + 1
      }
    })
  
  return Object.entries(planCounts)
    .sort(([,a], [,b]) => b - a)
    .map(([plan, count]) => ({ plan, count }))
} 