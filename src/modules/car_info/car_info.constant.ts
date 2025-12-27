import { Car_Info } from "@/database/schemas/car_info.schema";

export enum CarInfoOrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updatedAt',
}

export const CarInfoAttributesForList: (keyof Car_Info)[] = [
    '_id',
    'id',
    'licensePlate',
    'parkingLotId',
    'parkingSpotId',
    'isParked',
    'createdAt',
    'updatedAt',
]

export const CarInfoAttributesForDetail: (keyof Car_Info)[] = [
    '_id',
    'id',
    'licensePlate',
    'parkingLotId',
    'parkingSpotId',
    'isParked',
]