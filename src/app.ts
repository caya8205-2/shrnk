import Fastify from "fastify";
import { db } from "./db/index.js";
import { links } from "./db/schema.js";
import { linksRoutes } from "./db/modules/links/links.routes.js";
import { eq } from "drizzle-orm";

export async function buildApp() {
    const app = Fastify({
        logger: true
    });

    app.get("/", async () => {
        return { 
            name: "ini API shrnk",
            version: "1.0.0"
        };
    });

    app.get("/health", async () => {
        const total = await db.$count(links);
        return { 
            status: "OK",
            totalLinks: total
        };
    });

    app.register(linksRoutes, {
        prefix: "/api/links"
    });

    app.get<{ Params: { slug: string } }>("/:slug", async (request, reply) => {
        const { slug } = request.params;
        const link = await db.select().from(links).where(eq(links.slug, slug)).get();
        if (!link) return reply.status(404).send({ message: "not found" });

        if (link.expiresAt && link.expiresAt * 1000 < Date.now()) {
            return reply.status(410).send({ message: "link has expired" });
        }

        await db.update(links).set({
            clicks: link.clicks + 1,
        })
        .where(eq(links.slug, slug)).run();

        return reply.redirect(link.url);
    });

    return app;
}