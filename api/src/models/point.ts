import Model, { SearchKey } from './model'
import { v1 as uuidV1 } from 'uuid'

export interface PointParams extends Record<string, unknown>{
    id?: string;
    name: string;
    image: string;
    email: string;
    whatsapp: string;
    latitude: string;
    longitude: string
    city: string;
    uf: string;
    items: Array<string>;
}

export interface PointFromDynamoParams extends SearchKey {
    id: string
}

class Point extends Model {
    private static TABLE_NAME = process.env.POINTS_TABLE

    id: string;

    name: string;

    image: string;

    email: string;

    whatsapp: string;

    latitude: string;

    longitude: string

    city: string;

    uf: string;

    items: Array<string>

    constructor ( {
      id,
      name,
      image,
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
      this.image = image
      this.email = email
      this.whatsapp = whatsapp
      this.latitude = latitude
      this.longitude = longitude
      this.city = city
      this.uf = uf
      this.items=items as Array<string>
    }

    static async fromDynamo ( { id }: PointFromDynamoParams ): Promise<Point> {
      const point = await super.fromDynamoTable( Point.TABLE_NAME, { id } ) // eslint-disable-line no-underscore-dangle

      // TODO: Use better errors, from some common ones in a specific folder
      if ( !point ) {
        throw new Error( 'Point not found' )
      }

      return new Point( point as unknown as PointParams )
    }

    static async all (): Promise<Array<Point>> {
      const users = await super.scan( Point.TABLE_NAME )

      return users.map( ( data ) => new Point( data as unknown as PointParams ) )
    }

    save (): Promise<unknown> {
      return super.save( this.toJSON() )
    }

    toJSON (): PointParams {
      return {
        city: this.city,
        email: this.email,
        id: this.id,
        image: this.image,
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
