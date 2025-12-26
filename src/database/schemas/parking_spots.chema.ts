import { Prop, Schema } from "@nestjs/mongoose";
import { MongoBaseSchema } from "./base.schema";
import { createSchemaForClass } from "../utils/helper";
import { MongoCollection } from "../utils/constants";
import * as mongoose from "mongoose";
export type Parking_SpotsDocument = SchemaDocument<Parking_Spots>;
@Schema({
    timestamps: true,
    collection: MongoCollection.PARKING_SPOTS,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
})
export class Parking_Spots extends MongoBaseSchema {
    @Prop({ required: true, type: String })
    spotCode: string; //A1-1, A1-2
    @Prop({ required: true, type: Boolean, default: true })
    isAvailable: boolean;
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Parking_Lots' })
    parkingLotId: mongoose.Types.ObjectId;
}

const Parking_SpotsSchema = createSchemaForClass(Parking_Spots);

export { Parking_SpotsSchema };