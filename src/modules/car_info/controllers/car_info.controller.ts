import { BaseController } from "@/common/base/base.controller";
import { CarInfoService } from "../services/car_info.service";
import { ApiOperation, ApiTags, ApiBody } from "@nestjs/swagger";
import { Controller, Param } from "@nestjs/common";
import { ApiResponseError, ApiResponseSuccess, SwaggerApiType } from "@/common/services/swagger.service";
import {
    createCarInfoSuccessResponseExample,
    deleteCarInfoSuccessResponseExample,
    getCarInfoDetailSuccessResponseExample,
    getCarInfoListSuccessResponseExample,
    updateCarInfoSuccessResponseExample
} from "../car_info.swagger";
import { CreateCarInfoDto, UpdateCarInfoDto, GetCarInfoListQuery } from '../car_info.interface'
import { TrimBodyPipe } from "@/common/pipe/trim.body.pipe";
import { JoiValidationPipe } from "@/common/pipe/joi.validation.pipe";
import { Body, Post, Patch, Delete, Get, Query } from "@nestjs/common";
import { SuccessResponse, ErrorResponse } from "@/common/helpers/response";
import { mongoIdSchema, HttpStatus } from "@/common/constants";
import { toObjectId } from "@/common/helpers/commonFunctions";
import { query } from "express";
@ApiTags('Car Info Apis')
@Controller('car-info')
export class CarInfoController extends BaseController {
    constructor(private readonly carInfoService: CarInfoService) {
        super();
    }

    @ApiOperation({ summary: 'Create Car Info' })
    @ApiResponseError([SwaggerApiType.CREATE])
    @ApiResponseSuccess([createCarInfoSuccessResponseExample])
    @ApiBody({ type: CreateCarInfoDto })
    @Post()
    async createCarInfo(
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: CreateCarInfoDto,
    ) {
        try {
            const result = await this.carInfoService.createCarInfo(dto);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Update Car Info by id' })
    @ApiResponseError([SwaggerApiType.UPDATE])
    @ApiResponseSuccess([updateCarInfoSuccessResponseExample])
    @ApiBody({ type: UpdateCarInfoDto })
    @Patch(':id')
    async updateCarInfo(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: UpdateCarInfoDto,
    ) {
        try {
            const carInfo = await this.carInfoService.findCarInfoById(toObjectId(id));
            if (!carInfo) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    `Car Info with id ${id} not found`
                )
            }
            const result = await this.carInfoService.updateCarInfo(toObjectId(id), dto);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Delete Car Info by id' })
    @ApiResponseError([SwaggerApiType.DELETE])
    @ApiResponseSuccess([deleteCarInfoSuccessResponseExample])
    @Delete(':id')
    async deleteCarInfo(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const carInfo = await this.carInfoService.findCarInfoById(toObjectId(id));
            if (!carInfo) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    `Car Info with id ${id} not found`
                )
            }
            const result = await this.carInfoService.deleteCarInfo(toObjectId(id));
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get Car Info by id' })
    @ApiResponseError([SwaggerApiType.GET_DETAIL])
    @ApiResponseSuccess([getCarInfoDetailSuccessResponseExample])
    @Get(':id')
    async getCarInfoById(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const result = await this.carInfoService.findCarInfoById(toObjectId(id));
            if (!result) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    `Car Info with id ${id} not found`
                )
            }
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get All Car Info by query' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess([getCarInfoListSuccessResponseExample])
    @Get()
    async getAllCarInfoList(
        @Query(new JoiValidationPipe())
        query: GetCarInfoListQuery,
    ) {
        try {
            const result = await this.carInfoService.findAllCarInfoByQuery(query);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}