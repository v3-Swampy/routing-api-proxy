import fastifyEnv from '@fastify/env'
import fp from 'fastify-plugin'

export interface RoutingConfig {
    PORT: string;
    ROUTING_API: string;
    CACHE_TTL: number;
    CHECK_PERIOD: number;
}

export default fp(async (fastify, opts) => {
    const schema = {
        type: 'object',
        required: [ 'PORT', 'ROUTING_API', 'CACHE_TTL' ],
        properties: {
            PORT: {
                type: 'string',
                default: 3000
            },
            ROUTING_API: {
                type: 'string',
            },
            CACHE_TTL: {
                type: 'number',
                default: 300
            },
            CHECK_PERIOD: {
                type: 'number',
                default: 60
            }
        }
    }

    const options = {
        schema: schema,
        dotenv: true
    }

    await fastify.register(fastifyEnv, options)
});

declare module 'fastify' {
    export interface FastifyInstance {
        config: RoutingConfig;
    }
}