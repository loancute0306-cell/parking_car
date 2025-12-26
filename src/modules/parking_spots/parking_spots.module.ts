import { Module } from "@nestjs/common";
import { ParkingSpotsRepository } from "./parking_spots.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { Parking_Spots, Parking_SpotsSchema } from '../../database/schemas/parking_spots.chema';
import { ParkingSpotsController } from "./controllers/parking_spots.controller";
import { ParkingSpotsService } from "./services/parking_spots.service";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: Parking_Spots.name, schema: Parking_SpotsSchema }]),
    ],
    controllers: [ParkingSpotsController],
    providers: [ParkingSpotsService, ParkingSpotsRepository],
    exports: [ParkingSpotsRepository],
})
export class ParkingSpotsModule { }
