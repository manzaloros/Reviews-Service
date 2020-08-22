FROM node:current
WORKDIR /seller-reviews
COPY package*.json ./
RUN npm install

EXPOSE 2625

COPY . .
RUN npm run build
CMD ["npm", "start"]