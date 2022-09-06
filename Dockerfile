FROM node:current-alpine as api-build

WORKDIR /app/api

COPY api/package*.json .

RUN npm ci 

COPY api .

RUN npm run build
RUN npm prune --production

FROM node:current-alpine as ui-build

WORKDIR /app/ui

COPY ui/package*.json .

RUN npm ci 

COPY ui .

RUN npm run build
RUN npm prune --production

FROM node:current-alpine as run

WORKDIR /app

# Copy API Artifacts
COPY --from=api-build /app/api/package.json ./package.json
COPY --from=api-build /app/api/package-lock.json ./package-lock.json
COPY --from=api-build /app/api/dist ./dist
COPY --from=api-build /app/api/node_modules ./node_modules

# Copy UI Artifacts
COPY --from=ui-build /app/ui/build ./assets

CMD [ "sh", "-c", "npm run start:prod"]