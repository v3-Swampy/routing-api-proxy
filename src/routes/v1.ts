import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'
import axios from 'axios';

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    const preHandler = async (request: FastifyRequest, reply: FastifyReply) => {
        const key = request.url;
        const cached = fastify.cache.get(key);
        if (cached) {
            return reply.send(cached);
        }
    }; 

    const preSerialization = async (request: FastifyRequest, reply: FastifyReply, payload: any) => {
        const key = request.url;
        fastify.cache.set(key, payload);
    }

    const options = {
        preHandler,
        preSerialization
    };

    fastify.get('/v1/quote', options, async function (request, reply) {
        const res = await axios.get(`${fastify.config.ROUTING_API}/quote`, {params: request.query});
        return res.data;
    })

    fastify.get('/v1/quoteToRatio', options, async function (request, reply) {
        const res = await axios.get(`${fastify.config.ROUTING_API}/quoteToRatio`, {params: request.query});
        return res.data;
    })
}

export default root;
