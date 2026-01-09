import { BaseController } from "@/common/base/base.controller";
import { Controller, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CarInfoService } from "../services/car_info.service";
import { ApiResponseError, ApiResponseSuccess, SwaggerApiType } from "@/common/services/swagger.service";
import { getCarInfoDetailSuccessResponseExample } from "../car_info.swagger";
import { Get } from "@nestjs/common";
import { SuccessResponse } from "@/common/helpers/response";
import { JwtAuthGuard } from "@/modules/guard/jwt-auth.guard";

@ApiTags('Car Info List')

@Controller('list')
export class CarInfoListController extends BaseController {
    constructor(private readonly carInfoService: CarInfoService) {
        super();
    }

    @ApiOperation({ summary: 'Get All Car Info List' })
    @ApiBearerAuth()

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllCarInfoList() {
        try {
            const result = await this.carInfoService.findAllCarInfo();
            return new SuccessResponse(result)
        } catch (error) {
            this.handleError(error)
        }
    }
}