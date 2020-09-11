FROM node:12
WORKDIR /Reviews-Service
COPY package*.json ./
RUN npm install --production

RUN npm install pm2 -g

ENV PORT 3001
ENV POSTGRES_HOST 3.14.143.176
ENV POSTGRES_USER zacharymansell
ENV POSTGRES_PASSWORD zacharymansell
ENV POSTGRES_PORT 5432
ENV POSTGRES_DB reviews
ENV URL localhost
ENV NODE_ENV production

EXPOSE 3001

COPY . .
# RUN npm run build
# CMD ["npm", "run", "start"]
CMD ["pm2-runtime", "server/index.js"]