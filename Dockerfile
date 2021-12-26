FROM node:10.15.3-alpine
WORKDIR /app
RUN npm install -g @vue/cli
COPY ./scripts/docker.start.sh /scripts/start.sh
RUN chmod +x /scripts/*
