import { BaseController } from "@/common/base/base.controller";
import { Controller } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CarInfoService } from '@/modules/car_info/services/car_info.service'
import { ApiResponseError, ApiResponseSuccess } from "@/common/services/swagger.service";
import { SwaggerApiType } from "@/common/services/swagger.service";
import { Get } from "@nestjs/common";
import { SuccessResponse } from "@/common/helpers/response";
import { getCarInfoListSuccessResponseExample } from "../car_info.swagger";
@ApiTags('Car Info History')
@Controller('history')
export class HistoryController extends BaseController {
    constructor(private readonly carInfoService: CarInfoService) {
        super();
    }

    @ApiOperation({ summary: 'Get All Car Info History' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess([getCarInfoListSuccessResponseExample])
    @Get()
    async getAllCarInfoIncludeDeleted(
    ) {
        try {
            const result = await this.carInfoService.findAllCarInfoIncludeDeleted();
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}