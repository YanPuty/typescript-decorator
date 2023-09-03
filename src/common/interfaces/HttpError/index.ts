export interface HttpErrorInterface {
  statusCode: number;
  error: string;
  message: string;
  errorCode?: number;
  payload?: any;
}