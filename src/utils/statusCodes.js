export const API_STATUS = {
  SUCCESS: 0,
  BUSINESS_ERROR: 1,
  SYSTEM_ERROR: -1,
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
};
