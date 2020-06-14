import { failure, success } from '@utils/response'
import { APIGatewayEvent } from 'aws-lambda'
import Item from '@models/item'
import { Response } from '@handlers/types'

export const handler = async ( _event: APIGatewayEvent ): Promise<Response> => {
  try {
    const items = await Item.all()

    return success( { items } )
  } catch ( erro ) {
    return failure( erro )
  }

}
