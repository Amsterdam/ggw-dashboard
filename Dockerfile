FROM node:10.15-stretch AS builder

LABEL maintainer="datapunt@amsterdam.nl"

EXPOSE 80

WORKDIR /app

COPY package.json \
  package-lock.json \
  .eslintrc.js \
  .gitignore \
  # babel.config.js \
  # jest.config.js \
  # postcss.config.js \
  # vue.config.js \
  /app/

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:


# Install NPM dependencies.
RUN npm --production=false --unsafe-perm ci && \
  npm cache clean --force

COPY . /app

# Build
RUN echo "run build"
RUN npm run build

# Deploy
FROM nginx:stable-alpine
COPY --from=builder /app/dist/. /var/www/html/

COPY default.conf /etc/nginx/conf.d/

