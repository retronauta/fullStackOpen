FROM node:18
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3000

USER node
CMD ["npm", "start"]
