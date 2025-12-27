import { Injectable, Type } from '@nestjs/common';
import { Car_Info, Car_InfoDocument } from '@/database/schemas/car_info.schema';
import { CreateCarInfoDto, GetCarInfoListQuery, UpdateCarInfoDto } from '../car_info.interface';
import { BaseService } from '@/common/base/base.service';
import { CarInfoRepository } from '../car_info.repository';
import { Types } from 'mongoose';
import { CarInfoAttributesForDetail } from '../car_info.constant';

@Injectable()
export class CarInfoService extends BaseService<Car_Info, CarInfoRepository> {
    constructor(private readonly carInfoRepository: CarInfoRepository) {
        super(carInfoRepository);
    }

    async createCarInfo(dto: CreateCarInfoDto) {
        try {
            const carInfo: SchemaCreateDocument<Car_Info> = {
                ...(dto as any),
            };
            return await this.carInfoRepository.createOne(carInfo);
        } catch (error) {
            this.logger.error('Error in CarInfoService createCarInfo: ' + error);
            throw error;
        }
    }

    async updateCarInfo(id: Types.ObjectId, dto: UpdateCarInfoDto) {
        try {
            await this.carInfoRepository.updateOneById(id, dto);
            return await this.findCarInfoById(id);
        } catch (error) {
            this.logger.error('Error in CarInfoService updateCarInfo: ' + error);
            throw error;
        }
    }

    async deleteCarInfo(id: Types.ObjectId) {
        try {
            await this.carInfoRepository.softDeleteOne({ _id: id });
            return { id };
        } catch (error) {
            this.logger.error('Error in CarInfoService deleteCarInfo: ' + error);
            throw error;
        }
    }

    async findCarInfoById(
        id: Types.ObjectId,
        attributes: (keyof Car_Info)[] = CarInfoAttributesForDetail,
    ) {
        try {
            return await this.carInfoRepository.getOneById(id, attributes);
        } catch (error) {
            this.logger.error('Error in CarInfoService findCarInfoById: ' + error);
            throw error;
        }
    }

    async findAllCarInfoByQuery(query: GetCarInfoListQuery) {
        try {
            return await this.carInfoRepository.findAllAndCountCarInfoByQuery(query);
        } catch (error) {
            this.logger.error('Error in CarInfoService findAllCarInfoByQuery: ' + error);
            throw error;
        }
    }
}