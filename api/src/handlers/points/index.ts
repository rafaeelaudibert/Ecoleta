import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Point from '@models/point'
import { Response } from '@handlers/types'

// eslint-disable-next-line require-await
export const handler = async ( _event: APIGatewayEvent ): Promise<Response> => {
  try {
    const points = await Point.all()

    return success( { points } )
  } catch ( erro ) {
    return failure( erro )
  }

}
