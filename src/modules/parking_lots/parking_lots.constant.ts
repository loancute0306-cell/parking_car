import { Parking_Lots } from 'src/database/schemas/parking_lots.schema'

export enum ParkingLotsOrderBy {
    ID = 'id',
    CREATED_AT = 'created_at',
    UPDATED_AT = 'updatedAt',
}

export const ParkingLotsAttributesForList: (keyof Parking_Lots)[] = [
    '_id',
    'id',
    'parkingLotName',
    'createdAt',
    'updatedAt',
];

export const ParkingLotsAttributesForDetail: (keyof Parking_Lots)[] = ['_id', 'id', 'parkingLotName'];


