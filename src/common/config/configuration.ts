import type { config as Default } from './default'
import type { config as Development } from './config.development'

type ObjectType = Record<string, unknown>

export const util = {
    isObject<T>(value: T): value is T & ObjectType {
        return (
            value !== null && typeof value === 'object' && !Array.isArray(value)
        )
    },
    merge<T extends ObjectType, U extends ObjectType>(
        target: T,
        source: U,
    ): T & U {
        for (const key of Object.keys(source)) {
            const targetValue = target[key]
            const sourceValue = source[key]
            if (this.isObject(targetValue) && this.isObject(sourceValue)) {
                Object.assign(sourceValue, this.merge(targetValue, sourceValue))
            }
        }

        return { ...target, ...source }
    },
}

export type Config = typeof Default & typeof Development

export const configuration = (async (): Promise<Config> => {
    const { config } = await import('./default')
    const environment = <{ config: typeof Development }>(
        await import(`./config.${process.env.NODE_ENV || 'development'}`)
    )

    // object deep merge
    return util.merge(config, environment.config)
})
