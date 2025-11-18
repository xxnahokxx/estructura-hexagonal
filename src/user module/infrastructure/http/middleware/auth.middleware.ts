import { FastifyRequest, FastifyReply } from "fastify";
import { JwtTokenService } from "../../services/jwt-token.service";

export interface AuthenticatedRequest extends FastifyRequest {
    user?: {
        userId: string;
        email: string;
        name: string;
    };
}

export async function authMiddleware(
    request: AuthenticatedRequest,
    reply: FastifyReply
) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({
                message: "Token de autorización requerido"
            });
        }

        const token = authHeader.substring(7); // Remover "Bearer "
        const tokenService = new JwtTokenService(
            process.env.JWT_SECRET || "your-super-secret-key"
        );

        // Verificar el token
        const decoded = tokenService.verifyToken(token);

        // Agregar info del usuario al request
        request.user = {
            userId: decoded.userId,
            email: decoded.email,
            name: decoded.name
        };

    } catch (error) {
        return reply.code(401).send({
            message: "Token inválido o expirado"
        });
    }
}
