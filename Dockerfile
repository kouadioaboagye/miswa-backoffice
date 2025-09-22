FROM node:22-alpine AS build

USER node
WORKDIR /home/node

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install \
  --frozen-lockfile \
  --non-interactive \
  --production=false \
  --ignore-script

COPY --chown=node:node . .
RUN yarn build

FROM node:22-alpine

USER node
WORKDIR /home/node

ENV NODE_ENV=production

COPY --chown=node:node --from=build /home/node/.next ./.next
COPY --chown=node:node --from=build /home/node/public ./public
COPY --chown=node:node --from=build /home/node/node_modules ./node_modules
COPY --chown=node:node --from=build /home/node/package.json ./package.json

CMD [ "yarn", "start" ]