import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { config } from './common/config/default'
import { globalMiddleware } from './common/middleware'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    globalMiddleware(app)

    app.setGlobalPrefix('api')

    await app.listen(config.SERVER_PORT || 3000)
}

bootstrap()
    .then(() => console.log('Bootstrap', new Date().toLocaleString()))
    .catch(console.error)
