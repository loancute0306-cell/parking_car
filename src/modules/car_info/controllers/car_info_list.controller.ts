import { BaseController } from "@/common/base/base.controller";
import { Controller } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CarInfoService } from "../services/car_info.service";
import { ApiResponseError, ApiResponseSuccess, SwaggerApiType } from "@/common/services/swagger.service";
import { getCarInfoDetailSuccessResponseExample } from "../car_info.swagger";
import { Get } from "@nestjs/common";
import { SuccessResponse } from "@/common/helpers/response";

@ApiTags('Car Info List')
@Controller('list')
export class CarInfoListController extends BaseController {
    constructor(private readonly carInfoService: CarInfoService) {
        super();
    }

    @ApiOperation({ summary: 'Get All Car Info List' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess([getCarInfoDetailSuccessResponseExample])
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