import { MongoBaseSchema } from './base.schema'
import { Prop, Schema } from '@nestjs/mongoose'
import { MongoCollection } from '../utils/constants'
import { createSchemaForClass } from '../utils/helper'
import * as mongoose from 'mongoose'
import { Parking_Lots } from './parking_lots.schema'
import { Parking_Spots } from './parking_spots.chema'
export type Car_InfoDocument = SchemaDocument<Car_Info>;
@Schema({
    timestamps: true,
    collection: MongoCollection.CAR_INFO,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
})
export class Car_Info extends MongoBaseSchema {
    @Prop({ required: true, type: String })
    licensePlate: string;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Parking_Lots.name })
    parkingLotId: mongoose.Types.ObjectId;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Parking_Spots.name })
    parkingSpotId: mongoose.Types.ObjectId;
    @Prop({ required: true, type: Boolean, default: false })
    isParked: boolean;
}

const Car_InfoSchema = createSchemaForClass(Car_Info);
export { Car_InfoSchema };