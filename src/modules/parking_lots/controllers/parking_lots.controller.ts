import { ApiBody, ApiTags, ApiOperation } from "@nestjs/swagger";
import { Controller, Delete, Patch, Post, Get, Query } from "@nestjs/common";
import { BaseController } from "@/common/base/base.controller";
import { ParkingLotsService } from "../services/parking_lots.service";
import { ApiResponseError, ApiResponseSuccess, SwaggerApiType } from "@/common/services/swagger.service";
import {
    createParkingLotSuccessResponseExample,
    updateParkingLotSuccessResponseExample,
    deleteParkingLotSuccessResponseExample,
    getParkingLotDetailSuccessResponseExample,
    getParkingLotListSuccessResponseExample
} from '@/modules/parking_lots/parking_lots.swagger'
import {
    CreateParkingLotDto,
    UpdateParkingLotDto,
    GetParkingLotListQuery
} from "../parking_lots.interface";
import { TrimBodyPipe } from "@/common/pipe/trim.body.pipe";
import { Body, Param } from "@nestjs/common";
import { SuccessResponse, ErrorResponse } from "@/common/helpers/response";
import { JoiValidationPipe } from "@/common/pipe/joi.validation.pipe";
import { mongoIdSchema, HttpStatus } from "@/common/constants";
import { toObjectId } from "@/common/helpers/commonFunctions";

@ApiTags("Parking Lots APIs")
@Controller("parking-lots")
export class ParkingLotsController extends BaseController {
    constructor(private readonly parkingLotsService: ParkingLotsService) {
        super();
    }

    // @ApiOperation({ summary: 'Create Parking Lot' })
    // @ApiResponseError([SwaggerApiType.CREATE])
    // @ApiResponseSuccess([createParkingLotSuccessResponseExample])
    // @ApiBody({ type: CreateParkingLotDto })
    // @Post()
    // async createParkingLot(
    //     @Body(new TrimBodyPipe(), new JoiValidationPipe())
    //     dto: CreateParkingLotDto,
    // ) {
    //     try {
    //         const result = await this.parkingLotsService.createParkingLot(dto);
    //         return new SuccessResponse(result);
    //     } catch (error) {
    //         this.handleError(error);
    //     }
    // }

    // @ApiOperation({ summary: 'Update Parking Lot by id' })
    // @ApiResponseError([SwaggerApiType.UPDATE])
    // @ApiResponseSuccess([updateParkingLotSuccessResponseExample])
    // @ApiBody({ type: UpdateParkingLotDto })
    // @Patch(':id')
    // async updateParkingLot(
    //     @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    //     @Body(new TrimBodyPipe(), new JoiValidationPipe())
    //     dto: UpdateParkingLotDto,
    // ) {
    //     try {
    //         const parkingLot = await this.parkingLotsService.findParkingLotById(toObjectId(id));
    //         if (!parkingLot) {
    //             return new ErrorResponse(
    //                 HttpStatus.ITEM_NOT_FOUND,
    //                 this.translate('errors.itemNotFound', {
    //                     args: {
    //                         id,
    //                     }
    //                 }),
    //             );
    //         }
    //         const result = await this.parkingLotsService.updateParkingLot(
    //             toObjectId(id),
    //             dto,
    //         );
    //         return new SuccessResponse(result);
    //     } catch (error) {
    //         this.handleError(error);
    //     }
    // }

    // @ApiOperation({ summary: 'Delete Parking Lot by id' })
    // @ApiResponseError([SwaggerApiType.DELETE])
    // @ApiResponseSuccess(deleteParkingLotSuccessResponseExample)
    // @Delete(':id')
    // async deleteParkingLot(
    //     @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    // ) {
    //     try {
    //         const parkingLot = await this.parkingLotsService.findParkingLotById(toObjectId(id));
    //         if (!parkingLot) {
    //             return new ErrorResponse(
    //                 HttpStatus.ITEM_NOT_FOUND,
    //                 this.translate('errors.itemNotFound', {
    //                     args: {
    //                         id,
    //                     }
    //                 }),
    //             );
    //         }
    //         const result = await this.parkingLotsService.deleteParkingLot(toObjectId(id));
    //         return new SuccessResponse(result);
    //     } catch (error) {
    //         this.handleError(error);
    //     }
    // }

    @ApiOperation({ summary: 'Get Parking Lot by id' })
    @ApiResponseError([SwaggerApiType.GET_DETAIL])
    @ApiResponseSuccess(getParkingLotDetailSuccessResponseExample)
    @Get(':id')
    async getParkingLotDetail(
        @Param('id', new JoiValidationPipe(mongoIdSchema)) id: string,
    ) {
        try {
            const result = await this.parkingLotsService.findParkingLotById(toObjectId(id));
            if (!result) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    this.translate('errors.itemNotFound', {
                        args: {
                            id,
                        }
                    }),
                )
            }
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }

    @ApiOperation({ summary: 'Get Parking Lot list' })
    @ApiResponseError([SwaggerApiType.GET_LIST])
    @ApiResponseSuccess(getParkingLotListSuccessResponseExample)
    @Get()
    async getParkingLotList(
        @Query(new JoiValidationPipe())
        query: GetParkingLotListQuery
    ) {
        try {
            const result = await this.parkingLotsService.findAllParkingLotsByQuery(query);
            return new SuccessResponse(result);
        } catch (error) {
            this.handleError(error);
        }
    }
}