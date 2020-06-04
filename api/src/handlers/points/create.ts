import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Point from '@models/point'
import { Response } from '@handlers/types'

export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = JSON.parse( event.body )

  const point = new Point( {
    city,
    email,
    image: 'placeholder',
    items,
    latitude,
    longitude,
    name,
    uf,
    whatsapp
  } )


  try {
    await point.save()

    return success( {
      point
    } )
  } catch ( error ) {
    return failure( error )
  }

}
