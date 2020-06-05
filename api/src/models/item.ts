import Model, { SearchKey } from './model'
import { v1 as uuidV1 } from 'uuid'

export interface ItemParams extends Record<string, unknown>{
    id?: string
    image?: string
    title: string
}

export interface ItemFromDynamoParams extends SearchKey {
    id: string
}

class Item extends Model {
    private static TABLE_NAME = process.env.ITEMS_TABLE

    id: string;

    image: string;

    title: string;

    constructor ( { id, image, title }: ItemParams ) {
      super( Item.TABLE_NAME )
      this.id = id || uuidV1()
      this.image = image
      this.title = title
    }

    static async fromDynamo ( { id }: ItemFromDynamoParams ): Promise<Item> {
      const item = await super.fromDynamoTable( Item.TABLE_NAME, { id } ) // eslint-disable-line no-underscore-dangle

      // TODO: Use better errors, from some common ones in a specific folder
      if ( !item ) {
        throw new Error( 'Item not found' )
      }

      return new Item( item as unknown as ItemParams )
    }

    static async all (): Promise<Item[]> {
      const items = await super.scan( Item.TABLE_NAME )

      return items.map( ( data ) => new Item( data as unknown as ItemParams ) )
    }

    toJSON (): ItemParams & {imageUrl: string} {
      return {
        id: this.id,
        imageUrl: `${process.env.ASSETS_BUCKET}/${this.image}`,
        title: this.title
      }
    }
}

export default Item
