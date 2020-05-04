export const APP_NAME = "Yousortube"
export const APP_NAME_LOWERCASE = APP_NAME.toLowerCase()
export const APP_NAME_UPPERCASE = APP_NAME.toUpperCase()

export const COOKIE_PREFIXED = (cookieName: string) => `${APP_NAME_LOWERCASE}_${cookieName}`
export const COOKIE_REFRESH_TOKEN = COOKIE_PREFIXED('refresh_token')

export const REFRESH_TOKEN_EXPIRACY_MS = (1000 * 60 * 60 * 12); // Twelve hours
export const JWT_EXPIRACY_MS = '15min';

