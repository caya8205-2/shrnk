import { db } from "../../index.js";
import { links } from "../../schema.js";
import { eq } from "drizzle-orm";

export class LinksRepository {
    async create(data: {
        slug: string;
        url: string;
    }) {
        db.insert(links).values(data).run();
    }

    async findBySlug(slug: string) {
        return db
            .select()
            .from(links)
            .where(eq(links.slug, slug))
            .get();
    }

    async findAll() {
        return db
            .select()
            .from(links)
            .all();
    }

    async delete(id: number) {
        return db
            .delete(links)
            .where(eq(links.id, id))
            .run();
    }
}