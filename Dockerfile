FROM node:latest

WORKDIR /usr/../api

COPY . .
COPY ./prisma ./prisma
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npx prisma generate --schema ./prisma/schema.prisma
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]