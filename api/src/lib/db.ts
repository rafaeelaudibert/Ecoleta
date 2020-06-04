import AWS from 'aws-sdk'


class DynamoDB {
  client: AWS.DynamoDB.DocumentClient

  constructor () {
    const options = process.env.IS_OFFLINE
      ? {
        endpoint: 'http://localhost:8000',
        region: 'localhost'
      }
      : {}

    this.client = new AWS.DynamoDB.DocumentClient( options )
  }

  put ( params: AWS.DynamoDB.DocumentClient.PutItemInput ) : Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> { // eslint-disable-line max-len
    return this.client.put( params ).promise()
  }

  get ( params: AWS.DynamoDB.DocumentClient.GetItemInput ) : Promise<AWS.DynamoDB.DocumentClient.GetItemOutput> { // eslint-disable-line max-len
    return this.client.get( params ).promise()
  }

  delete ( params: AWS.DynamoDB.DocumentClient.DeleteItemInput ) : Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> { // eslint-disable-line max-len
    return this.client.delete( params ).promise()
  }

  query ( params: AWS.DynamoDB.DocumentClient.QueryInput ) : Promise<AWS.DynamoDB.DocumentClient.QueryOutput> { // eslint-disable-line max-len
    return this.client.query( params ).promise()
  }

  scan ( params: AWS.DynamoDB.DocumentClient.ScanInput ) : Promise<AWS.DynamoDB.DocumentClient.ScanOutput> { // eslint-disable-line max-len
    return this.client.scan( params ).promise()
  }
}

export default DynamoDB
