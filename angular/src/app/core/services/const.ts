export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum AuthEndPoint {
  LOGIN = '/auth/login',
  LOGOUT = '/auth/logout',
  CURRENT_USER = '/auth/me',
  REGISTER = '/auth/register',
  REFRESH_TOKEN = '/auth/refresh-token',
  // FORGOT_PASSWORD
  // RESET_PASSWORD
}
