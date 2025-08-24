import Fastify from "fastify";
import authRoutes from "./modules/auth/auth.routes";
import setupRoutes from "./modules/setup/setup.routes";

export const app = Fastify({ logger: true });

app.register(authRoutes, { prefix: "/auth" });
app.register(setupRoutes, { prefix: "/setup" });
