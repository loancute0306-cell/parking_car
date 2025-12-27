import { INPUT_TEXT_MAX_LENGTH } from "@/common/constants";
import { JoiValidate } from "@/common/decorators/validator.decorator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { CommonListQuery } from "@/common/interfaces";
import { CarInfoOrderBy } from "./car_info.constant";
export class CreateCarInfoDto {
    @ApiProperty({
        type: String,
        default: 'ABC-1234',
        maxLength: 20
    })
    @JoiValidate(Joi.string().trim().max(20).required())
    licensePlate: string;

    @ApiProperty({
        type: String,
        default: '659e7592b3b56d0946b3c7b5',
        description: 'Parking Lot ID where the car is parked',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingLotId: string;

    @ApiProperty({
        type: String,
        default: '759e7592b3b56d0946b3c7b9',
        description: 'Parking Spot ID where the car is parked',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingSpotId: string;

    @ApiProperty({
        type: Boolean,
        default: false,
        description: 'Is the car currently parked'
    })
    @JoiValidate(Joi.boolean().required())
    isParked: boolean;
}

export class UpdateCarInfoDto {
    @ApiProperty({
        type: String,
        default: 'ABC-1234',
        maxLength: 20
    })
    @JoiValidate(Joi.string().trim().max(20).required())
    licensePlate: string;

    @ApiProperty({
        type: String,
        default: '659e7592b3b56d0946b3c7b5',
        description: 'Parking Lot ID where the car is parked',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingLotId: string;

    @ApiProperty({
        type: String,
        default: '759e7592b3b56d0946b3c7b9',
        description: 'Parking Spot ID where the car is parked',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingSpotId: string;

    @ApiProperty({
        type: Boolean,
        default: false,
        description: 'Is the car currently parked'
    })
    @JoiValidate(Joi.boolean().required())
    isParked: boolean;
}

export class GetCarInfoListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: CarInfoOrderBy,
        default: CarInfoOrderBy.UPDATED_AT,
    })
    @JoiValidate(Joi.string().valid(...Object.values(CarInfoOrderBy)).optional())
    orderBy?: CarInfoOrderBy;

    @ApiProperty({
        type: String,
        default: 'ABC-1234',
        description: 'Filter by license plate',
    })
    @JoiValidate(Joi.string().trim().max(20).optional())
    licensePlate?: string;

    // @ApiProperty({
    //     type: String,
    //     default: '659e7592b3b56d0946b3c7b5',
    //     description: 'Filter by Parking Lot ID',
    //     maxLength: INPUT_TEXT_MAX_LENGTH
    // })
    // @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    // parkingLotId?: string;

    // @ApiProperty({
    //     type: String,
    //     default: '759e7592b3b56d0946b3c7b9',
    //     description: 'Filter by Parking Spot ID',
    //     maxLength: INPUT_TEXT_MAX_LENGTH
    // })
    // @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    // parkingSpotId?: string;

    // @ApiProperty({
    //     type: Boolean,
    //     default: false,
    //     description: 'Filter by parking status',
    // })
    // @JoiValidate(Joi.boolean().optional())
    // isParked?: boolean;
}