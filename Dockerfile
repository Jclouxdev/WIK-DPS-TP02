# Stage 1
FROM node:latest
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 3000
RUN npm run tsc
CMD npm run start