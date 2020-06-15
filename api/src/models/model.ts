/* eslint-disable sort-keys */
import AWS from 'aws-sdk'

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
        Key
      }

      const { Item } = await connection.get( params )

      return Item as Record<string, unknown>
    }

    static async scan (
      table: string,
      filters: Record<string, string> = {}
    ): Promise<Record<string, unknown>[]> {
      const connection = new DB()

      const filterExpression = Object.entries( filters ).map( ( [ key ] ) => `${key} = :${key}` )
        .join( ' AND ' )

      const expressionAttributeValues = Object.entries( filters ).reduce(
        ( obj, [ key, value ] ) => ( {
          ...obj,
          [`:${key}`]: value
        } ),
        {}
      )

      const params: AWS.DynamoDB.DocumentClient.ScanInput = {
        TableName: table
      }

      if ( filterExpression !== '' ) {
        params.FilterExpression = filterExpression
        params.ExpressionAttributeValues = expressionAttributeValues
      }

      const allItems: Record<string, unknown>[] = []
      let shouldContinue = false
      let lastKey = null
      do {
        shouldContinue = false
        if ( lastKey ) {
          params.ExclusiveStartKey = lastKey
        }

        const { Items, LastEvaluatedKey } = await connection.scan( params ) // eslint-disable-line no-await-in-loop
        allItems.push( ...Items )

        if ( LastEvaluatedKey ) {
          lastKey = LastEvaluatedKey
          shouldContinue = true
        }
      } while ( shouldContinue )


      return allItems
    }

    save ( Item: Record<string, unknown> ): Promise<unknown> {
      const connection = new DB()
      const params = {
        TableName: this.table,
        Item
      }

      return connection.put( params )
    }

    delete ( id: string ): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
      const connection = new DB()
      const params = {
        TableName: this.table,
        Key: {
          'id': id
        }
      }

      return connection.delete( params )
    }

    abstract toJSON(): Record<string, unknown>
}
