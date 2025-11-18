import Fastify from "fastify";
import { InMemoryUserRepository } from "./user module/infrastructure/repositories/in-memory-user.repository";
import { CreateUserUseCase } from "./user module/application/use-cases/create-user.usecase";
import { GetUserUseCase } from "./user module/application/use-cases/get-user.usecase";
import { ListUsersUseCase } from "./user module/application/use-cases/list-users.usecase";
import { UpdateUserUseCase } from "./user module/application/use-cases/update-user.usecase";
import { DeleteUserUseCase } from "./user module/application/use-cases/delete-user.usecase";
import { UserController } from "./user module/infrastructure/http/controllers/user.controller";
import { userRoutes } from "./user module/infrastructure/http/routes/user.routes";
import { CreatePedidoUseCase } from "./pedidos module/application/use-cases/create-pedido.usecase";
import { PedidoController } from "./pedidos module/infraestructure/http/controllers/pedido.controller";
import { InMemoryPedidoRepository } from "./pedidos module/infraestructure/repositories/in-memory-pedido.repository";
import { pedidoRoutes } from "./pedidos module/infraestructure/http/routes/pedido.routes";
import { BcryptPasswordService } from "./user module/infrastructure/services/bcrypt-password.service";
import { LoginUserUseCase } from "./user module/application/use-cases/login-user.usecase";
import { JwtTokenService } from "./user module/infrastructure/services/jwt-token.service";
import { InMemoryRutaRepository } from "./rutas module/infrastructure/repositories/in-memory-ruta.repository";
import { CreateRutaUseCase } from "./rutas module/application/use-cases/create-ruta.usecase";
import { RutaController } from "./rutas module/infrastructure/http/controllers/ruta.controller";
import { rutaRoutes } from "./rutas module/infrastructure/http/routes/ruta.routes";
import { CreateConductorUseCase } from "./conductores module/application/use-cases/create-conductor.usecase";
import { FindByPlacaUseCase } from "./conductores module/application/use-cases/find-by-placa.usecase";
import { ConductorController } from "./conductores module/infrastructure/http/controllers/conductor.controller";
import { conductorRoutes } from "./conductores module/infrastructure/http/routes/conductor.routes";
import { InMemoryConductorRepository } from "./conductores module/infrastructure/repositories/in-memory-ruta.repository";
export async function buildServer() {
    const fastify = Fastify({ logger: true });
    // --- Infra: repositorio concreto --

    await fastify.register(require('@fastify/swagger'), {
        swagger: {
            info: {
                title: 'Hexagonal API',
                description: 'API con arquitectura hexagonal para gestión de usuarios, pedidos y rutas',
                version: '1.0.0',
                contact: {
                    name: 'Tu Nombre',
                    email: 'tu@email.com'
                }
            },
            host: 'localhost:3000',
            schemes: ['http'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [
                { name: 'Auth', description: 'Autenticación de usuarios' },
                { name: 'Users', description: 'Gestión de usuarios' },
                { name: 'Pedidos', description: 'Gestión de pedidos' },
                { name: 'Rutas', description: 'Gestión de rutas' }
            ],
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Authorization',
                    in: 'header',
                    description: 'JWT Bearer token. Formato: Bearer <token>'
                }
            }
        }
    });

    // Configurar Swagger UI
    await fastify.register(require('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        staticCSP: true,
        transformSpecificationClone: true
    });

    const userRepo = new InMemoryUserRepository();
    const pedidoRepo = new InMemoryPedidoRepository(); // Aquí deberías instanciar el repositorio concreto de pedidos
    const rutaRepo = new InMemoryRutaRepository();
    const conductorRepo = new InMemoryConductorRepository();


    const passwordService = new BcryptPasswordService();
    const tokenService = new JwtTokenService(process.env.JWT_SECRET || "your-super-secret-key",
        "24h");

    // --- Application: instanciar use-cases inyectando los puertos --
    const createUserUC = new CreateUserUseCase(userRepo, passwordService);
    const loginUserUC = new LoginUserUseCase(userRepo, passwordService, tokenService);
    const getUserUC = new GetUserUseCase(userRepo);
    const listUsersUC = new ListUsersUseCase(userRepo);
    const updateUserUC = new UpdateUserUseCase(userRepo);
    const deleteUserUC = new DeleteUserUseCase(userRepo);
    const createPedidoUC = new CreatePedidoUseCase(pedidoRepo);
    // --- Ruta Application
    const createRutaUC = new CreateRutaUseCase(rutaRepo);

    // --- Conductor Application

    const createConductorUC = new CreateConductorUseCase(conductorRepo);
    const findByPlacaUC = new FindByPlacaUseCase(conductorRepo);

    // --- Controller: agrupa los use-cases para exponerlos por HTTP --
    const userController = new UserController(
        createUserUC,
        loginUserUC,
        getUserUC,
        listUsersUC,
        updateUserUC,
        deleteUserUC
    );


    const rutaController = new RutaController(
        createRutaUC
    )

    const pedidoController = new PedidoController(
        createPedidoUC
    );

    const conductorController = new ConductorController(
        createConductorUC,
        findByPlacaUC
    );

    // registrar controller en fastify para que las rutas lo puedan usar
    (fastify as any).userController = userController;
    (fastify as any).pedidoController = pedidoController;
    (fastify as any).rutaController = rutaController;
    (fastify as any).conductorController = conductorController;
    // registrar rutas
    fastify.register(userRoutes);
    fastify.register(pedidoRoutes);
    fastify.register(rutaRoutes);
    fastify.register(conductorRoutes);

    return fastify;
}
