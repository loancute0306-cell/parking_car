import { INPUT_TEXT_MAX_LENGTH } from "@/common/constants";
import { JoiValidate } from "@/common/decorators/validator.decorator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { CommonListQuery } from "@/common/interfaces";
import { ParkingSpotsOrderBy } from "./parking_spots.constant";

export class CreateParkingSpotDto {
    @ApiProperty({
        type: String,
        default: 'A1-1',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    spotCode: string; //A1-1, A1-2

    @ApiProperty({
        type: String,
        default: '659e7592b3b56d0946b3c7b5',
        description: 'Parking Lot ID where the spot belongs to',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingLotId: string;

    @ApiProperty({
        type: Boolean,
        default: true,
        description: 'Is the parking spot available'
    })
    @JoiValidate(Joi.boolean().required())
    isAvailable: boolean;
}

export class UpdateParkingSpotDto {
    @ApiProperty({
        type: String,
        default: 'A1-1',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    spotCode: string; //A1-1, A1-2

    @ApiProperty({
        type: String,
        default: '659e7592b3b56d0946b3c7b5',
        description: 'Parking Lot ID where the spot belongs to',
        maxLength: INPUT_TEXT_MAX_LENGTH
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingLotId: string;

    @ApiProperty({
        type: Boolean,
        default: true,
        description: 'Is the parking spot available'
    })
    @JoiValidate(Joi.boolean().required())
    isAvailable: boolean;
}

export class GetParkingSpotListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: ParkingSpotsOrderBy,
        description: 'Which field used to sort',
        default: ParkingSpotsOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(ParkingSpotsOrderBy))
            .optional(),
    )
    orderBy?: ParkingSpotsOrderBy;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: "Parking Spot's code for filter",
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    spotCode?: string;

    // @ApiProperty({
    //     type: String,
    //     maxLength: INPUT_TEXT_MAX_LENGTH,
    //     default: "Parking Lot's ID for filter",
    // })
    // @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    // parkingLotId?: string;

    // @ApiProperty({
    //     type: Boolean,
    //     default: true,
    //     description: 'Filter by availability status',
    // })
    // @JoiValidate(Joi.boolean().optional())
    // isAvailable?: boolean;
}