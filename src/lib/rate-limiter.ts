// Simple in-memory rate limiter
// Voor productie zou je Redis of een externe service gebruiken

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
}

const DEFAULT_CONFIG: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10, // 10 requests per 15 minutes
}

export function rateLimit(
  identifier: string, 
  config: RateLimitConfig = DEFAULT_CONFIG
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = `${identifier}`
  
  // Clean up expired entries
  if (store[key] && now > store[key].resetTime) {
    delete store[key]
  }
  
  // Initialize or get existing entry
  if (!store[key]) {
    store[key] = {
      count: 0,
      resetTime: now + config.windowMs
    }
  }
  
  const entry = store[key]
  entry.count++
  
  const allowed = entry.count <= config.maxRequests
  const remaining = Math.max(0, config.maxRequests - entry.count)
  
  return {
    allowed,
    remaining,
    resetTime: entry.resetTime
  }
}

// Rate limit configurations for different endpoints
export const RATE_LIMITS = {
  checkout: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 checkout attempts per 15 minutes
  },
  webhook: {
    windowMs: 1 * 60 * 1000, // 1 minute
    maxRequests: 100, // 100 webhook calls per minute
  },
} as const

// Helper to get client IP for rate limiting
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
} 