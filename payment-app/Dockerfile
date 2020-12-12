FROM node:14.15-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN npm run build
CMD ["yarn", "start:prod"]
