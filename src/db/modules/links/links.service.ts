import { nanoid } from "nanoid";
import { LinksRepository } from "./links.repository.js";

export class LinksService {
    constructor(
        private readonly repo = new LinksRepository()
    ) {}

    async create(
        url: string,
        customSlug?: string
    ) {
        const slug = customSlug ?? nanoid(6);
        const exist = await this.repo.findBySlug(slug);
        if (exist) {
            throw new Error("Slug already exists");
        }
        await this.repo.create({
            slug,
            url
        });
        return slug;
    }

    async findAll() {
        return this.repo.findAll();
    }

    async delete(id: number) {
        await this.repo.delete(id);
    }
}