import AWS from 'aws-sdk'

class S3 {
    bucket: string

    s3Client: AWS.S3

    constructor ( bucket: string ) {
      const options = process.env.IS_OFFLINE
        ? {
          accessKeyId: 'S3RVER',
          endpoint: 'http://localhost:4569',
          s3ForcePathStyle: true,
          secretAccessKey: 'S3RVER'
        }
        : {}

      this.s3Client = new AWS.S3( options )
      this.bucket = bucket
    }

    getSignedUrl ( operation: string, { key, contentType }: Record<string, string> ): string {
      return this.s3Client.getSignedUrl( operation, {
        ACL: 'public-read',
        Bucket: this.bucket,
        ContentType: contentType,
        Key: key
      } )
    }
}

export default S3
