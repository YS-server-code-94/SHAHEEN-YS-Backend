export const ERROR_MESSAGES = {
  // Validation
  INVALID_PROVIDER: 'Invalid provider specified',
  INVALID_REQUEST: 'Invalid request payload',
  MISSING_REQUIRED_FIELD: 'Missing required field',

  // Provider
  PROVIDER_NOT_AVAILABLE: 'Provider is not available',
  PROVIDER_ERROR: 'Provider returned an error',
  PROVIDER_TIMEOUT: 'Provider request timed out',

  // Auth
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_TOKEN: 'Invalid authentication token',
  TOKEN_EXPIRED: 'Authentication token expired',

  // Server
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable',

  // API
  NOT_FOUND: 'Resource not found',
  METHOD_NOT_ALLOWED: 'Method not allowed',
} as const;

export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  PROVIDER_NOT_AVAILABLE: 'PROVIDER_NOT_AVAILABLE',
  PROVIDER_ERROR: 'PROVIDER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;
