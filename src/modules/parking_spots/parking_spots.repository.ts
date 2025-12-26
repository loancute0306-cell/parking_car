import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@/common/base/base.repository';
import { Parking_Spots, Parking_SpotsDocument } from '@/database/schemas/parking_spots.chema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { GetParkingSpotListQuery } from './parking_spots.interface';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY, DEFAULT_ORDER_DIRECTION,
    softDeleteCondition, OrderDirection
} from "@/common/constants";
import { parseMongoProjection } from '@/common/helpers/commonFunctions';
import { ParkingSpotsAttributesForList } from './parking_spots.constant';
@Injectable()
export class ParkingSpotsRepository extends BaseRepository<Parking_Spots> {
    constructor(
        @InjectModel(Parking_Spots.name)
        private readonly parkingSpotsModel: Model<Parking_SpotsDocument>,
    ) {
        super(parkingSpotsModel);
    }

    async findAllAndCountParkingSpotsByQuery(query: GetParkingSpotListQuery) {
        try {
            const {
                keyword = '',
                page = +DEFAULT_FIRST_PAGE,
                limit = +DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                spotCode = '',
            } = query;

            const matchQuery: FilterQuery<Parking_Spots> = {};
            matchQuery.$and = [
                {
                    ...softDeleteCondition,
                },
            ];

            if (keyword) {
                matchQuery.$and.push({
                    spotCode: { $regex: `.*${keyword}.*`, $options: 'i' },
                });
            }

            if (spotCode) {
                matchQuery.$and.push({
                    spotCode,
                });
            }

            const [result] = await this.parkingSpotsModel.aggregate([
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
                    $project: parseMongoProjection(ParkingSpotsAttributesForList),
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
            this.logger.error('Error in ParkingSpotsRepository findAllAndCountParkingSpotsByQuery: ' + error);
            throw error;
        }
    }
}