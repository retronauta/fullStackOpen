FROM node:20

WORKDIR /usr/src/app 

COPY . .

ENV VITE_BACKEND_URL=$http://localhost:3000

RUN yarn install

CMD ["yarn", "run", "dev"]
