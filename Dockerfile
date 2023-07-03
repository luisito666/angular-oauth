FROM node:18.10.0 as builder

LABEL maintainer="Luis Penagos <luispenagos91@gmail.com>"

ENV ROOT=/app

RUN mkdir -p $ROOT

RUN npm install -g @angular/cli 

COPY ./ $ROOT

WORKDIR $ROOT

RUN npm install

RUN ng build --optimization

FROM nginx:alpine

WORKDIR $ROOT

COPY --from=builder /app/dist/auth-example/ /usr/share/nginx/html

COPY ./compose/nginx/default.conf /etc/nginx/conf.d/
