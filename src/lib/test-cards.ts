// Stripe Test Cards voor verschillende scenario's
// Gebruik deze alleen in development/test omgeving

export const STRIPE_TEST_CARDS = {
  // Successful payments
  SUCCESS: {
    VISA: '4242424242424242',
    VISA_DEBIT: '4000056655665556',
    MASTERCARD: '5555555555554444',
    AMEX: '378282246310005',
  },
  
  // Failed payments
  DECLINED: {
    GENERIC: '4000000000000002',
    INSUFFICIENT_FUNDS: '4000000000009995',
    LOST_CARD: '4000000000009987',
    STOLEN_CARD: '4000000000009979',
    EXPIRED_CARD: '4000000000000069',
    INCORRECT_CVC: '4000000000000127',
    PROCESSING_ERROR: '4000000000000119',
  },
  
  // Authentication required (3D Secure)
  AUTH_REQUIRED: {
    AUTHENTICATE_SUCCESS: '4000002500003155',
    AUTHENTICATE_FAIL: '4000008400001629',
  },
  
  // International cards
  INTERNATIONAL: {
    BRAZIL: '4000000760000002', // BR
    MEXICO: '4000004840000008', // MX
    INDIA: '4000003560000008',  // IN
  },
  
  // Specific behaviors
  BEHAVIORS: {
    ALWAYS_CHARGEBACK: '4000000000000259',
    FRAUD_WARNING: '4100000000000019',
    RISK_LEVEL_ELEVATED: '4000000000004954',
  }
} as const

// Test CVV codes
export const TEST_CVC = {
  VALID: '123',
  INVALID: '000',
} as const

// Test expiry dates
export const TEST_EXPIRY = {
  VALID: {
    month: '12',
    year: '2030',
  },
  EXPIRED: {
    month: '12',
    year: '2020',
  },
} as const

// Helper function to get test card info
export function getTestCardInfo(scenario: keyof typeof STRIPE_TEST_CARDS) {
  return STRIPE_TEST_CARDS[scenario]
}

// Development warning
export function logTestCardWarning() {
  if (process.env.NODE_ENV === 'development') {
    console.warn('🚨 DEVELOPMENT MODE: Using Stripe test cards. Geen echte betalingen!')
  }
} 