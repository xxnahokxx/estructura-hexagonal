import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
export async function userRoutes(fastify: FastifyInstance, opts: any) {
    const controller: UserController = (fastify as any).userController;
    fastify.post("/user/register", {
        schema: {
            tags: ['Auth'],
            summary: 'Registrar nuevo usuario',
            description: 'Crea una nueva cuenta de usuario',
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: {
                        type: 'string',
                        minLength: 2,
                        description: 'Nombre completo del usuario'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'Correo electrónico único'
                    },
                    password: {
                        type: 'string',
                        minLength: 6,
                        description: 'Contraseña (mínimo 6 caracteres)'
                    }
                }
            },
            response: {
                201: {
                    description: 'Usuario creado exitosamente',
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' }
                    }
                },
                400: {
                    description: 'Error de validación',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, controller.create.bind(controller));
    fastify.post("/user/login", controller.login.bind(controller));

    fastify.get("/users", {
        preHandler: [authMiddleware],
        schema: {
            tags: ['Users'],
            summary: 'Listar usuarios',
            description: 'Obtiene la lista de todos los usuarios registrados',
            security: [{ Bearer: [] }],
            response: {
                200: {
                    description: 'Lista de usuarios',
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' }
                        }
                    }
                },
                401: {
                    description: 'Token requerido o inválido',
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, controller.list.bind(controller));
    fastify.get("/users/:id", {
        preHandler: [authMiddleware]
    }, controller.get.bind(controller));
    fastify.put("/users/:id", {
        preHandler: [authMiddleware]
    }, controller.update.bind(controller));
    fastify.delete("/users/:id", {
        preHandler: [authMiddleware]
    }, controller.delete.bind(controller));
}

