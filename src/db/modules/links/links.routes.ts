import type { FastifyInstance } from "fastify";
import { 
    createLink,
    getLinks,
    deleteLink
} from "./links.controller.js";

export async function linksRoutes(app: FastifyInstance) {
    app.post("/", createLink);
    app.get("/", getLinks);
    app.delete("/:id", deleteLink);
}