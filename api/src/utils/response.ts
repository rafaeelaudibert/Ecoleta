/* eslint-disable sort-keys */
import { Response } from '@handlers/types'
import StatusCode from '@utils/httpStatus'

export const success = (
  body: Record<string, unknown>,
  statusCode: StatusCode = StatusCode.OK
): Response => ( {
  body: JSON.stringify( body ),
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
} )

export const failure = (
  error: Error,
  statusCode: StatusCode = StatusCode.INTERNAL_SERVER_ERROR,
  extraData: Record<string, unknown> = {}
): Response => ( {
  body: JSON.stringify( {
    error: error.message,
    ...extraData
  } ),
  statusCode,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
} )
