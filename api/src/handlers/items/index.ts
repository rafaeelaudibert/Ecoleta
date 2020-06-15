import { APIGatewayEvent } from 'aws-lambda'

import { Response } from '@handlers/types'
import { failure, success } from '@utils/response'

import Item from '@models/item'

export const handler = async ( _event: APIGatewayEvent ): Promise<Response> => {
  try {
    const items = await Item.all()

    return success( { items } )
  } catch ( erro ) {
    return failure( erro )
  }

}
