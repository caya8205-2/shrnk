import type { FastifyReply, FastifyRequest } from "fastify";
import { CreateLinkSchema } from "./links.schema.js";
import { LinksService } from "./links.service.js";

const service = new LinksService();

export async function createLink(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const parsed = CreateLinkSchema.safeParse(request.body);
    if (!parsed.success) {
        return reply.status(400).send({
            message: parsed.error.flatten()
        });
    }

    const slug = await service.create(
        parsed.data.url,
        parsed.data.slug
    );
    return reply.status(201).send({ 
        slug,
        shortUrl: `${request.protocol}://${request.hostname}/${slug}`
    });
}

export async function getLinks() {
    return service.findAll();
}

export async function deleteLink(
    request: FastifyRequest<{ 
        Params: { id: string } 
    }>
) {
    await service.delete(Number(request.params.id));
    return { 
        success: true
    };
}