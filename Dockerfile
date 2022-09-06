FROM node:current-alpine as build

WORKDIR /app/api

COPY api/package*.json .

RUN npm ci 

COPY api .

RUN npm run build
RUN npm prune --production

FROM node:current-alpine as run

WORKDIR /app

COPY --from=build /app/api/package.json ./package.json
COPY --from=build /app/api/package-lock.json ./package-lock.json
COPY --from=build /app/api/dist ./dist
COPY --from=build /app/api/node_modules ./node_modules
CMD [ "sh", "-c", "npm run start:prod"]