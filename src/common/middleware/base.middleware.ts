import { INestApplication } from '@nestjs/common'
import fileStreamRotator from 'file-stream-rotator'
import compression from 'compression'
import morgan from 'morgan'
import helmet from 'helmet'
import path from 'path'

// 按天 切分日志
const accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(__dirname, '../../logs', 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false,
})

export function globalMiddleware(app: INestApplication): INestApplication {
    app.use(compression())
    app.use(helmet())
    const morganOption =
        process.env.NODE_ENV === 'production'
            ? { stream: accessLogStream }
            : void 0
    app.use(morgan('combined', morganOption))

    return app
}
