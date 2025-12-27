import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@/common/base/base.repository";
import { Car_Info, Car_InfoDocument } from "@/database/schemas/car_info.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { GetCarInfoListQuery } from "./car_info.interface";
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY, DEFAULT_ORDER_DIRECTION,
    softDeleteCondition, OrderDirection
} from "@/common/constants";
import { parseMongoProjection } from '@/common/helpers/commonFunctions';
import { CarInfoAttributesForList } from "./car_info.constant";

@Injectable()
export class CarInfoRepository extends BaseRepository<Car_Info> {
    constructor(
        @InjectModel(Car_Info.name)
        private readonly carInfoModel: Model<Car_InfoDocument>,
    ) {
        super(carInfoModel);
    }

    async findAllAndCountCarInfoByQuery(query: GetCarInfoListQuery) {
        try {
            const {
                keyword = '',
                page = +DEFAULT_FIRST_PAGE,
                limit = +DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                licensePlate = '',
            } = query;

            const matchQuery: FilterQuery<Car_Info> = {};
            matchQuery.$and = [
                {
                    ...softDeleteCondition,
                },
            ];

            if (keyword) {
                matchQuery.$and.push({
                    licensePlate: { $regex: `.*${keyword}.*`, $options: 'i' },
                });
            }

            if (licensePlate) {
                matchQuery.$and.push({
                    licensePlate,
                });
            }

            const [result] = await this.carInfoModel.aggregate([
                {
                    $addFields: {
                        id: { $toString: '$_id' },
                    },
                },
                {
                    $match: {
                        ...matchQuery,
                    },
                },
                {
                    $project: parseMongoProjection(CarInfoAttributesForList),
                },
                {
                    $facet: {
                        count: [{ $count: 'total' }],
                        data: [
                            {
                                $sort: {
                                    [orderBy]:
                                        orderDirection === OrderDirection.ASC
                                            ? 1
                                            : -1,
                                    ['_id']:
                                        orderDirection === OrderDirection.ASC
                                            ? 1
                                            : -1,
                                },
                            },
                            {
                                $skip: (page - 1) * limit,
                            },
                            {
                                $limit: Number(limit),
                            },
                        ],
                    },
                },
            ]);
            return {
                totalItems: result?.count?.[0]?.total || 0,
                item: result?.data || [],
            }
        } catch (error) {
            this.logger.error('Error in CarInfoRepository findAllAndCountCarInfoByQuery: ' + error);
            throw error;
        }
    }
}