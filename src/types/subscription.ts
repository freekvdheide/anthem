export interface User {
  id: string
  email: string
  stripe_customer_id?: string
  subscription_status: SubscriptionStatus
  subscription_plan?: PlanType
  subscription_period_end?: Date
  created_at: Date
  updated_at: Date
}

export interface Payment {
  id: string
  user_id: string
  stripe_payment_id: string
  amount: number
  currency: string
  status: PaymentStatus
  created_at: Date
  updated_at: Date
}

export interface Subscription {
  id: string
  user_id: string
  stripe_subscription_id: string
  plan_type: PlanType
  billing_cycle: BillingCycle
  current_period_start: Date
  current_period_end: Date
  cancel_at_period_end: boolean
  status: SubscriptionStatus
  created_at: Date
  updated_at: Date
}

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'incomplete' | 'trialing'

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'canceled'

export type PlanType = 'basic' | 'essential' | 'growth'

export type BillingCycle = 'monthly' | 'annually'

export interface CheckoutSessionRequest {
  planType: PlanType
  billingCycle: BillingCycle
}

export interface CheckoutSessionResponse {
  sessionId: string
  url: string | null
} 