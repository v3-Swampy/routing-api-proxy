import fp from 'fastify-plugin'
import NodeCache from 'node-cache'

export default fp(async (fastify, opts) => {
    const routesCache = new NodeCache({ 
        stdTTL: fastify.config.CACHE_TTL, 
        checkperiod: fastify.config.CHECK_PERIOD
    });
    fastify.decorate('cache', routesCache);
});

declare module 'fastify' {
    export interface FastifyInstance {
        cache: NodeCache;
    }
}