import {APIGatewayEvent} from 'aws-lambda'
import {Response} from './types'
import StatusCode from '../utils/httpStatus'

// eslint-disable-next-line require-await
export const handler = async ( _event: APIGatewayEvent ): Promise<Response> => {
  const statusCode = StatusCode.OK

  return {
    body: 'Hello World',
    statusCode
  }
}
