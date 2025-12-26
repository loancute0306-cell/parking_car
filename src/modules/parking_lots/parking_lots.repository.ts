import { Injectable } from "@nestjs/common";
import { BaseRepository } from '../../common/base/base.repository'
import { Parking_Lots, Parking_LotsDocument } from '../../database/schemas/parking_lots.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { GetParkingLotListQuery } from "./parking_lots.interface";
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY, DEFAULT_ORDER_DIRECTION,
    softDeleteCondition, OrderDirection
} from "@/common/constants";
import { parseMongoProjection } from "@/common/helpers/commonFunctions";
import { ParkingLotsAttributesForList } from "./parking_lots.constant";



@Injectable()
export class ParkingLotsRepository extends BaseRepository<Parking_Lots> {
    constructor(
        @InjectModel(Parking_Lots.name)
        private readonly parkingLotsModel: Model<Parking_LotsDocument>,
    ) {
        super(parkingLotsModel);
    }

    async findAllAndCountParkingLotsByQuery(query: GetParkingLotListQuery) {
        try {
            const {
                keyword = '',
                page = +DEFAULT_FIRST_PAGE,
                limit = +DEFAULT_LIMIT_FOR_PAGINATION,
                orderBy = DEFAULT_ORDER_BY,
                orderDirection = DEFAULT_ORDER_DIRECTION,
                parkingLotName = '',
            } = query;

            const matchQuery: FilterQuery<Parking_Lots> = {};
            matchQuery.$and = [
                {
                    ...softDeleteCondition,
                },
            ];

            if (keyword) {
                matchQuery.$and.push({
                    parkingLotName: { $regex: `.*${keyword}.*`, $options: 'i' },
                });
            }

            if (parkingLotName) {
                matchQuery.$and.push({
                    parkingLotName,
                });
            }

            const [result] = await this.parkingLotsModel.aggregate([
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
                    $project: parseMongoProjection(ParkingLotsAttributesForList),
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
        }
        catch (error) {
            this.logger.error('Error in ParkingLotsRepository findAllAndCountParkingLotsByQuery: ' + error);
            throw error;
        }
    }
}