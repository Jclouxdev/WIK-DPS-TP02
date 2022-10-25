# Stage 1
FROM node:latest
WORKDIR /usr/src/app
EXPOSE 3000
COPY ["package.json", "package-lock.json", "./"]
RUN ["npm", "install"]
COPY ["index.ts", "tsconfig.json", "./"]
RUN ["npm", "run", "tsc"]
ENTRYPOINT ["node", "./build/index"]