import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Item from '@models/item'
import Point from '@models/point'
import { Response } from '@handlers/types'
import StatusCode from '@utils/httpStatus'

export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const { id } = event.pathParameters

  try {
    const point = await Point
      .fromDynamo( { id } )
      .then( ( fetchedPoint ) => fetchedPoint.toJSON() )
    const items = await Item.all()

    const pointItems = items.filter( ( item ) => point.items.includes( item.id ) )

    return success( { point: {
      ...point,
      items: pointItems
    } } )

  } catch ( error ) {
    let statusCode = StatusCode.INTERNAL_SERVER_ERROR
    if ( error.message === 'Point not found' ) {
      statusCode = StatusCode.NOT_FOUND
    }

    return failure( error, statusCode )
  }
}
