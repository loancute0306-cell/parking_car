import { Parking_Spots } from "@/database/schemas/parking_spots.chema";

export enum ParkingSpotsOrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updatedAt',
}

export const ParkingSpotsAttributesForList: (keyof Parking_Spots)[] = [
    '_id',
    'id',
    'spotCode',
    'parkingLotId',
    'isAvailable',
    'createdAt',
    'updatedAt',
];

export const ParkingSpotsAttributesForDetail: (keyof Parking_Spots)[] = [
    '_id',
    'id',
    'spotCode',
    'parkingLotId',
    'isAvailable',
];