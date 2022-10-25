# Stage 1
FROM node:latest
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]
COPY ["index.ts", "tsconfig.json", "./"]
RUN ["npm", "run", "tsc"]
RUN ["useradd", "-M", "fastify"]
USER fastify
ENTRYPOINT ["node", "./build/index"]
EXPOSE 3000/tcp