export const API_STATUS = {
  SUCCESS: 0,
  BUSINESS_ERROR: 1,
  SYSTEM_ERROR: -1,
  UNAUTHORIZED: 401,       // Session expired or invalid guest
  NOT_FOUND: 404,          // Resource/Game ID doesn't exist
  SERVER_BUSY: 503,        // Too many demo users (Rate limiting)
  MAINTENANCE: 500        // Database or SP is undergoing maintenance
};

export const API_STATUS_MAP = {
  [API_STATUS.SUCCESS]: {
    severity: 'success',
    defaultMsg: 'Successful !',
  },
  [API_STATUS.BUSINESS_ERROR]: {
    severity: 'warning',
    defaultMsg: 'Business error !.',
  },
  [API_STATUS.SYSTEM_ERROR]: {
    severity: 'error',
    defaultMsg: 'System error !',
  },
  [API_STATUS.UNAUTHORIZED]: {
    severity: 'error',
    defaultMsg: 'No Authorization.',
  },
  [API_STATUS.NOT_FOUND]: {
    severity: 'warning',
    defaultMsg: 'Missing ',
  },
  [API_STATUS.SERVER_BUSY]: {
    severity: 'info',
    defaultMsg: 'Busy. One moment...',
  },
  [API_STATUS.MAINTENANCE]: {
    severity: 'info',
    defaultMsg: 'Under maintenance. Back soon!',
  },
};