import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Point from '@models/point'
import { Response } from '@handlers/types'
import S3 from '../../lib/S3'

const { IMAGES_BUCKET } = process.env

export const handler = async ( event: APIGatewayEvent ): Promise<Response> => {
  const {
    name,
    email,
    imageContentType,
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
    items,
    latitude,
    longitude,
    name,
    uf,
    whatsapp
  } )

  const s3 = new S3( IMAGES_BUCKET as string )

  try {
    await point.save()

    // Check if we need a signedUrl
    let signedUrl = ''
    if ( imageContentType ) {
      const key = point.id
      const contentType = imageContentType
      signedUrl = s3.getSignedUrl( 'putObject', {
        contentType,
        key
      } )
    }

    return success( {
      point,
      signedUrl
    } )
  } catch ( error ) {
    return failure( error )
  }

}
