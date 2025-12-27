import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Car_Info, Car_InfoSchema } from '../../database/schemas/car_info.schema';
import { CarInfoController } from "./controllers/car_info.controller";
import { CarInfoService } from "./services/car_info.service";
import { CarInfoRepository } from "./car_info.repository";


@Module({
    imports: [MongooseModule.forFeature([{ name: Car_Info.name, schema: Car_InfoSchema }])],
    controllers: [CarInfoController],
    providers: [CarInfoService, CarInfoRepository],
    exports: [CarInfoRepository],
})
export class CarInfoModule { }