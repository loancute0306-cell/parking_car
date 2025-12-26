import { Injectable } from "@nestjs/common";
import { BaseService } from "../../../common/base/base.service";
import { Parking_Spots } from "@/database/schemas/parking_spots.chema";
import { ParkingSpotsRepository } from "../parking_spots.repository";
import { CreateParkingSpotDto, UpdateParkingSpotDto, GetParkingSpotListQuery } from "../parking_spots.interface";
import { Types } from "mongoose";
import { ParkingSpotsAttributesForDetail } from "../parking_spots.constant";
@Injectable()
export class ParkingSpotsService extends BaseService<Parking_Spots, ParkingSpotsRepository> {
    constructor(private readonly parkingSpotsRepository: ParkingSpotsRepository) {
        super(parkingSpotsRepository);
    }

    async createParkingSpot(dto: CreateParkingSpotDto) {
        try {
            const parkingSpot: SchemaCreateDocument<Parking_Spots> = {
                ...(dto as any),
            };
            return await this.parkingSpotsRepository.createOne(parkingSpot);
        } catch (error) {
            this.logger.error('Error in ParkingSpotsService createParkingSpot: ' + error);
            throw error;
        }
    }

    async updateParkingSpot(id: Types.ObjectId, dto: UpdateParkingSpotDto) {
        try {
            await this.parkingSpotsRepository.updateOneById(id, dto);
            return await this.findParkingSpotById(id);
        } catch (error) {
            this.logger.error('Error in ParkingSpotsService updateParkingSpot: ' + error);
            throw error;
        }
    }

    async deleteParkingSpot(id: Types.ObjectId) {
        try {
            await this.parkingSpotsRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in ParkingSpotsService deleteParkingSpot: ' + error);
            throw error;
        }
    }

    async findParkingSpotById(
        id: Types.ObjectId,
        attributes: (keyof Parking_Spots)[] = ParkingSpotsAttributesForDetail,
    ) {
        try {
            return await this.parkingSpotsRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in ParkingSpotsService findParkingSpotById: ' + error);
            throw error;
        }
    }

    async findAllParkingSpotsByQuery(query: GetParkingSpotListQuery) {
        try {
            return await this.parkingSpotsRepository.findAllAndCountParkingSpotsByQuery(query);
        } catch (error) {
            this.logger.error('Error in ParkingSpotsService findAllParkingSpotsByQuery: ' + error);
            throw error;
        }
    }
}