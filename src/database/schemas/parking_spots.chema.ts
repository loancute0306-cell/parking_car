import { Prop, Schema } from "@nestjs/mongoose";
import { MongoBaseSchema } from "./base.schema";
import { createSchemaForClass } from "../utils/helper";
import { MongoCollection } from "../utils/constants";
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
    spotName: string;
}

const Parking_SpotsSchema = createSchemaForClass(Parking_Spots);

export { Parking_SpotsSchema };