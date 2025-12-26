import { BaseService } from "@/common/base/base.service";
import { Injectable } from "@nestjs/common";
import { Parking_Lots } from "@/database/schemas/parking_lots.schema";
import { ParkingLotsRepository } from "@/modules/parking_lots/parking_lots.repository"
import {
    CreateParkingLotDto, UpdateParkingLotDto,
    GetParkingLotListQuery
} from "../parking_lots.interface";
import { Types } from "mongoose"
import { ParkingLotsAttributesForDetail } from "../parking_lots.constant";
@Injectable()
export class ParkingLotsService extends BaseService<Parking_Lots, ParkingLotsRepository> {
    constructor(private readonly parkingLotsRepository: ParkingLotsRepository) {
        super(parkingLotsRepository);
    }

    async createParkingLot(dto: CreateParkingLotDto) {
        try {
            const parkingLot: SchemaCreateDocument<Parking_Lots> = {
                ...(dto as any),
            };
            return await this.parkingLotsRepository.createOne(parkingLot);
        } catch (error) {
            this.logger.error('Error in ParkingLotsService createParkingLot: ' + error);
            throw error;
        }
    }

    async updateParkingLot(id: Types.ObjectId, dto: UpdateParkingLotDto) {
        try {
            await this.parkingLotsRepository.updateOneById(id, dto);
            return await this.findParkingLotById(id);
        } catch (error) {
            this.logger.error('Error in ParkingLotsService updateParkingLot: ' + error);
            throw error;
        }
    }

    async deleteParkingLot(id: Types.ObjectId) {
        try {
            await this.parkingLotsRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in ParkingLotsService deleteParkingLot: ' + error);
            throw error;
        }
    }

    async findParkingLotById(
        id: Types.ObjectId,
        attributes: (keyof Parking_Lots)[] = ParkingLotsAttributesForDetail,
    ) {
        try {
            return await this.parkingLotsRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in ParkingLotsService findParkingLotById: ' + error);
            throw error;
        }
    }

    async findAllParkingLotsByQuery(query: GetParkingLotListQuery) {
        try {
            const result = await this.parkingLotsRepository.findAllAndCountParkingLotsByQuery(query);
            return result;
        } catch (error) {
            this.logger.error('Error in ParkingLotsService findAllParkingLotsByQuery: ' + error);
            throw error;
        }
    }
}