import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Point from '@models/point'
import { Response } from '@handlers/types'
import StatusCode from '@utils/httpStatus'

export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const { id } = event.pathParameters

  try {
    await Point.fromDynamo( { id } ).then( ( point ) => point.delete() )

    return success( { }, StatusCode.ACCEPTED )

  } catch ( error ) {
    let statusCode = StatusCode.INTERNAL_SERVER_ERROR
    if ( error.message === 'Point not found' ) {
      statusCode = StatusCode.NOT_FOUND
    }

    return failure( error, statusCode )
  }
}
