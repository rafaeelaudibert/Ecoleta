import StatusCode from '../utils/httpStatus'

export interface Response {
    body: string;
    statusCode: StatusCode;
}

