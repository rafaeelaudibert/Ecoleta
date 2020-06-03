import {APIGatewayEvent} from 'aws-lambda'
import {Response} from '@handlers/types'
import StatusCode from '@utils/httpStatus'

// eslint-disable-next-line require-await
export const handler = async ( _event: APIGatewayEvent ): Promise<Response> => {
  const statusCode = StatusCode.OK

  return {
    body: JSON.stringify( {data: 'Hello World2345'} ),
    statusCode
  }
}
