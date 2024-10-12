export interface IErrorResponse {
  title: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  trace: string;
}
