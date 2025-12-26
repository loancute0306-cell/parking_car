import { INPUT_TEXT_MAX_LENGTH } from "@/common/constants";
import { JoiValidate } from "@/common/decorators/validator.decorator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { CommonListQuery } from "@/common/interfaces";
import { ParkingLotsOrderBy } from "./parking_lots.constant";
export class CreateParkingLotDto {
    @ApiProperty({
        type: String,
        default: 'Parking Lot 1',
        maxLength: INPUT_TEXT_MAX_LENGTH,
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingLotName: string;
}

export class UpdateParkingLotDto {
    @ApiProperty({
        type: String,
        default: 'Parking Lot 1',
        maxLength: INPUT_TEXT_MAX_LENGTH,
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    parkingLotName: string;
}

export class GetParkingLotListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: ParkingLotsOrderBy,
        description: 'Which field used to sort',
        default: ParkingLotsOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(ParkingLotsOrderBy))
            .optional(),
    )
    orderBy?: ParkingLotsOrderBy;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: "Parking Lot's name for filter",
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    parkingLotName?: string;
}