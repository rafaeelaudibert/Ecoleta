import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Item from '@models/item'
import Point from '@models/point'
import { Response } from '@handlers/types'

// eslint-disable-next-line require-await
export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const { id } = event.pathParameters

  try {
    const point = await Point.fromDynamo( { id } )
    const items = await Item.all()

    const pointItems = items.filter( ( item ) => point.items.includes( item.id ) )

    return success( { point: {
      ...point,
      items: pointItems
    } } )

  } catch ( error ) {
    return failure( error )
  }
}
