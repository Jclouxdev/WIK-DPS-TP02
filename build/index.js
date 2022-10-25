"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)({});
const opts = {
    schema: {
        response: {
            200: {
                type: "object",
                properties: {
                    pong: {
                        type: "string",
                    },
                },
            },
        },
    },
};
server.get("/ping", opts, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    return JSON.stringify(request.headers);
}));
server.get("*", opts, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.statusCode = 404;
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var env_port = !process.env.PING_LISTEN_PORT
            ? 3000
            : +process.env.PING_LISTEN_PORT;
        yield server.listen({ port: env_port });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
