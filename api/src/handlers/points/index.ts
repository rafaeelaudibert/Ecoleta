import { APIGatewayEvent } from 'aws-lambda'

import { Response } from '@handlers/types'
import { failure, success } from '@utils/response'

import Point from '@models/point'


export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const { city, uf, items } = event.queryStringParameters || {}

  const parsedItems = items && items.split( ',' )

  try {
    const points = await Point.filter( JSON.parse( JSON.stringify( {
      city,
      uf
    } ) ) )

    // Only if parsed some items, and it is not an empty list
    const filteredPoints = parsedItems && parsedItems[0] !== ''
      ? points.filter( ( point ) => parsedItems.find( ( item ) => point.items.includes( item ) ) )
      : points

    return success( { points: filteredPoints } )
  } catch ( erro ) {
    return failure( erro )
  }

}
