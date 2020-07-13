import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

import * as cors from 'cors';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: 'http://localhost:4200',
        credentials: true
    });
    await app.listen(app.get(ConfigService).port);
}
bootstrap();
