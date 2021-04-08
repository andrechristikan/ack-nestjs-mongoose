import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app/app.service';
import { ResponseService } from 'src/response/response.service';
import { Response, ResponseStatusCode } from 'src/response/response.decorator';
import { IResponse } from 'src/response/response.interface';
import { AuthBasicGuard } from 'src/auth/auth.decorator';
@Controller('/test')
export class AppController {
    constructor(
        @Response() private readonly responseService: ResponseService,
        private readonly appService: AppService
    ) {}

    @Get('/hello')
    @ResponseStatusCode()
    async testHello(): Promise<IResponse> {
        const message: string = await this.appService.getHello();
        return this.responseService.success(message);
    }

    @AuthBasicGuard()
    @Get('/basic-token')
    @ResponseStatusCode()
    async testBasicToken(): Promise<IResponse> {
        const message: string = await this.appService.getHello();
        return this.responseService.success(message);
    }
}
