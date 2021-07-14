import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { SequelizeModule } from '@nestjs/sequelize'

import { configuration } from './common/config'

import { ReportModule } from './report/report.module'
@Module({
    imports: [
        // config
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        // database
        SequelizeModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get('DB_CONFIG'),
            }),
            inject: [ConfigService],
        }),
        // public
        ServeStaticModule.forRoot({
            rootPath: `${__dirname}/../public`,
            renderPath: '/',
        }),
        ReportModule,
    ],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply().forRoutes('/')
    }
}
