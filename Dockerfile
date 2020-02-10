FROM node:10.15-stretch  AS builder
LABEL maintainer="datapunt@amsterdam.nl"

EXPOSE 80

WORKDIR /app

COPY package.json \
  package-lock.json \
  .eslintrc.js \
  .gitignore \
  /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:


# Install NPM dependencies.
RUN npm --production=false --unsafe-perm install && \
  npm cache clean --force

COPY . /app

# Build
RUN echo "run build"
RUN npm run build

# Deploy
FROM nginx:stable-alpine
COPY --from=builder /app/dist/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log
