import { Module } from "@nestjs/common";
import { LicensePlateController } from "./controllers/license_plate.controller";
import { LicensePlateService } from "./services/license_plate.service";

@Module({
    controllers: [LicensePlateController],
    providers: [LicensePlateService],
    exports: [LicensePlateService],
})

export class LicensePlateModule { }