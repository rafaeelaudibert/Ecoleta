import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Point from '@models/point'
import { Response } from '@handlers/types'

// eslint-disable-next-line require-await
export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const { city, uf, items } = event.queryStringParameters

  const parsedItems = items && items.split( ',' )

  try {
    const points = await Point.filter( JSON.parse( JSON.stringify( {
      city,
      uf
    } ) ) )

    const filteredPoints = parsedItems
      ? points.filter( ( point ) => parsedItems.find( ( item ) => point.items.includes( item ) ) )
      : points

    return success( { points: filteredPoints } )
  } catch ( erro ) {
    return failure( erro )
  }

}
