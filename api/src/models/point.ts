import { v1 as uuidV1 } from 'uuid'

import Model, { SearchKey } from './model'

export interface PointParams extends Record<string, unknown>{
    id?: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: string;
    longitude: string
    city: string;
    uf: string;
    items: string[];
}

export interface PointFromDynamoParams extends SearchKey {
    id: string
}

class Point extends Model {
    private static TABLE_NAME = process.env.POINTS_TABLE

    id: string

    name: string

    email: string

    whatsapp: string

    latitude: string

    longitude: string

    city: string

    uf: string

    items: string[]

    constructor ( {
      id,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    }: PointParams ) {
      super( Point.TABLE_NAME )
      this.id = id || uuidV1()
      this.name = name
      this.email = email
      this.whatsapp = whatsapp
      this.latitude = latitude
      this.longitude = longitude
      this.city = city
      this.uf = uf
      this.items = items as string[]
    }

    static async fromDynamo ( { id }: PointFromDynamoParams ): Promise<Point> {
      const point = await super.fromDynamoTable( Point.TABLE_NAME, { id } ) // eslint-disable-line no-underscore-dangle

      // TODO: Use better errors, from some common ones in a specific folder
      if ( !point ) {
        throw new Error( 'Point not found' )
      }

      return new Point( point as unknown as PointParams )
    }

    static async filter ( filters: Record<string, string> ): Promise<Point[]> {
      const points = await super.scan( Point.TABLE_NAME, filters )

      return points.map( ( data ) => new Point( data as unknown as PointParams ) )
    }

    delete (): Promise<unknown> {
      return super.delete( this.id )
    }

    save (): Promise<unknown> {
      return super.save( this.toJSON() )
    }

    toJSON (): PointParams {
      return {
        city: this.city,
        email: this.email,
        id: this.id,
        items: this.items,
        latitude: this.latitude,
        longitude: this.longitude,
        name: this.name,
        uf: this.uf,
        whatsapp: this.whatsapp
      }
    }
}

export default Point
