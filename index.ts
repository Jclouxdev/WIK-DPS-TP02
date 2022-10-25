import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
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

server.get("/ping", opts, async (request, response) => {
  return JSON.stringify(request.headers);
});

server.get("*", opts, async (request, response) => {
  response.statusCode = 404;
});

const start = async () => {
  try {
    var env_port: number = !process.env.PING_LISTEN_PORT
      ? 3000
      : +process.env.PING_LISTEN_PORT;
    await server.listen({ port: env_port });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
