import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import { ConfigService } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';

@Injectable()
export class RequestCorsMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    use(req: Request, res: Response, next: NextFunction): void {
        const env: string = this.configService.get<string>('app.env');

        const allowOrigin =
            env === ENUM_APP_ENVIRONMENT.PRODUCTION
                ? this.configService.get<string | boolean | string[]>(
                      'request.cors.allowOrigin'
                  )
                : '*';
        const allowMethod = this.configService.get<string[]>(
            'request.cors.allowMethod'
        );
        const allowHeader = this.configService.get<string[]>(
            'request.cors.allowHeader'
        );

        const corsOptions: CorsOptions = {
            origin: allowOrigin,
            methods: allowMethod,
            allowedHeaders: allowHeader,
            preflightContinue: false,
            credentials: true,
            optionsSuccessStatus: HttpStatus.NO_CONTENT,
        };

        cors(corsOptions)(req, res, next);
    }
}