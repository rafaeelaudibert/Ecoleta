import DB from '@lib/db'

export type SearchKey = Record<string, unknown>
export type QueryKey = Record<string, unknown>

export default abstract class Model {
    private table: string

    constructor ( table: string ) {
      this.table = table
    }

    static async fromDynamoTable (
      table: string,
      Key: SearchKey
    ): Promise<Record<string, unknown>> {
      const connection = new DB()
      const params = {
        TableName: table,
        Key // eslint-disable-line sort-keys
      }

      const { Item } = await connection.get( params )

      return Item as Record<string, unknown>
    }


    // TODO: Add filters and fetch every data
    static async scan ( table: string ): Promise<Array<Record<string, unknown>>> {
      const connection = new DB()

      const params = {
        TableName: table
      }

      const { Items } = await connection.scan( params )

      return Items as Array<Record<string, unknown>>
    }

    save ( Item: Record<string, unknown> ): Promise<unknown> {
      const connection = new DB()
      const params = {
        TableName: this.table,
        Item // eslint-disable-line sort-keys
      }

      return connection.put( params )
    }

    abstract toJSON(): Record<string, unknown>
}
