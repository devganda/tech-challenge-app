"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const fastify_1 = __importDefault(require("fastify"));
//import userRoutes from './routes/user.route';
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const redis_1 = __importDefault(require("@infrastructure/redis/redis"));
dotenv_1.default.config();
async function startServer() {
    const app = (0, fastify_1.default)();
    app.register(swagger_1.default, {
        swagger: {
            info: {
                title: 'Tech Challenge API',
                description: 'API documentation',
                version: '1.0.0'
            },
            host: 'localhost:3000',
            schemes: ['http']
        }
    });
    app.register(swagger_ui_1.default, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        }
    });
    app.get('/', async () => {
        await redis_1.default.set('welcome', 'Hello teach challenge!');
        const message = await redis_1.default.get('welcome');
        return { message };
    });
    //app.register(userRoutes, { prefix: '/users' });
    try {
        await app.listen({ port: parseInt(process.env.PORT || '3000'), host: '0.0.0.0' });
        console.log('🚀 Server running');
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
