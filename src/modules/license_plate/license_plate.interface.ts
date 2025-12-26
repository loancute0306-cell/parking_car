import { JoiValidate } from "@/common/decorators/validator.decorator";
import { ApiProperty } from "@nestjs/swagger";
import Joi from "joi";


export class RecognizeLicensePlateDto {
    @ApiProperty({
        type: String,
    })
    @JoiValidate(Joi.string().uri().required())
    imageUrl: string;
}