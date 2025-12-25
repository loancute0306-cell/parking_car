import { MongoBaseSchema } from './base.schema'
import { Prop, Schema } from '@nestjs/mongoose'
import { createSchemaForClass } from '../utils/helper'
import { MongoCollection } from '../utils/constants'
export type Parking_LotsDocument = SchemaDocument<Parking_Lots>
@Schema({
    timestamps: true,
    collection: MongoCollection.PARKING_LOTS,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})
export class Parking_Lots extends MongoBaseSchema {
    @Prop({ required: true, type: String })
    parkingLotName: string;
}

const Parking_LotsSchema = createSchemaForClass(Parking_Lots);

export { Parking_LotsSchema };