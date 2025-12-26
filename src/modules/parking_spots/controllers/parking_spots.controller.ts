import { ApiOperation, ApiTags, ApiBody } from "@nestjs/swagger";
import { Controller, Post, Patch, Delete, Get, Query } from "@nestjs/common";
import { BaseController } from "@/common/base/base.controller";
import { ParkingSpotsService } from "../services/parking_spots.service";
import { ApiResponseError, ApiResponseSuccess, SwaggerApiType } from "@/common/services/swagger.service";
import {
    createParkingSpotSuccessResponseExample,
    updateParkingSpotSuccessResponseExample,
    deleteParkingSpotSuccessResponseExample,
    getParkingSpotDetailSuccessResponseExample,
    getParkingSpotListSuccessResponseExample
} from "@/modules/parking_spots/parking_spots.swagger";
import { Body, Param } from "@nestjs/common";
import { mongoIdSchema, HttpStatus } from "@/common/constants";
import { SuccessResponse, ErrorResponse } from "@/common/helpers/response";
import {
    CreateParkingSpotDto,
    UpdateParkingSpotDto,
    GetParkingSpotListQuery
} from "../parking_spots.interface";
import { toObjectId } from "@/common/helpers/commonFunctions";
import { TrimBodyPipe } from "@/common/pipe/trim.body.pipe";
import { JoiValidationPipe } from "@/common/pipe/joi.validation.pipe";
@ApiTags('Parking Spots APIs')
@Controller('parking-spots')
export class ParkingSpotsController extends BaseController {
    constructor(private readonly parkingSpotsService: ParkingSpotsService) {
        super();
    }

    @ApiOperation({ summary: 'Create Parking Spot' })
    @ApiResponseError([SwaggerApiType.CREATE])
    @ApiResponseSuccess([createParkingSpotSuccessResponseExample])
    @ApiBody({ type: CreateParkingSpotDto })
    @Post()
    async createParkingSpot(
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: CreateParkingSpotDto,
    ) {
        try {
            const result = await this.parkingSpotsService.createParkingSpot(dto);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Update Parking Spot by id' })
    @ApiResponseError([SwaggerApiType.UPDATE])
    @ApiResponseSuccess([updateParkingSpotSuccessResponseExample])
    @ApiBody({ type: UpdateParkingSpotDto })
    @Patch(':id')
    async updateParkingSpot(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
        @Body(new TrimBodyPipe(), new JoiValidationPipe())
        dto: UpdateParkingSpotDto,
    ) {
        try {
            const parkingSpot = await this.parkingSpotsService.findParkingSpotById(toObjectId(id));
            if (!parkingSpot) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('errors.itemNotFound', {
                        args: {
                            id,
                        }
                    }),
                );
            }
            const result = await this.parkingSpotsService.updateParkingSpot(toObjectId(id), dto);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Delete Parking Spot by id' })
    @ApiResponseError([SwaggerApiType.DELETE])
    @ApiResponseSuccess([deleteParkingSpotSuccessResponseExample])
    @Delete(':id')
    async deleteParkingSpot(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const parkingSpot = await this.parkingSpotsService.findParkingSpotById(toObjectId(id));
            if (!parkingSpot) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('errors.itemNotFound', {
                        args: {
                            id,
                        }
                    }),
                );
            }
            const result = await this.parkingSpotsService.deleteParkingSpot(toObjectId(id));
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get Parking Spot detail by id' })
    @ApiResponseError([SwaggerApiType.GET_DETAIL])
    @ApiResponseSuccess([getParkingSpotDetailSuccessResponseExample])
    @Get(':id')
    async getParkingSpotById(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const result = await this.parkingSpotsService.findParkingSpotById(toObjectId(id));
            if (!result) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('errors.itemNotFound', {
                        args: {
                            id,
                        }
                    }),
                );
            }
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get Parking Spot list by query' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess([getParkingSpotListSuccessResponseExample])
    @Get()
    async getParkingSpotList(
        @Query(new JoiValidationPipe())
        query: GetParkingSpotListQuery,
    ) {
        try {
            const result = await this.parkingSpotsService.findAllParkingSpotsByQuery(query);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}