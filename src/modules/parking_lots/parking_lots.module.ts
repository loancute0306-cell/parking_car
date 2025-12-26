import { Module } from "@nestjs/common";
import { ParkingLotsRepository } from "./parking_lots.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Parking_Lots, Parking_LotsSchema } from '../../database/schemas/parking_lots.schema';
import { ParkingLotsController } from "./controllers/parking_lots.controller";
import { ParkingLotsService } from "./services/parking_lots.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Parking_Lots.name, schema: Parking_LotsSchema }]),
    ],
    controllers: [ParkingLotsController],
    providers: [ParkingLotsService, ParkingLotsRepository],
    exports: [ParkingLotsRepository],
})
export class ParkingLotsModule { }