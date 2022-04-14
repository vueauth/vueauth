FROM node:14

ARG WWWGROUP

# Installing libvips-dev for sharp compatability
RUN apt-get update -y && apt-get install -y libvips-dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./
COPY ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g
RUN yarn install
WORKDIR /opt/app
COPY ./ .
RUN yarn build

RUN groupadd --force -g 33 strapi
RUN useradd -ms /bin/bash --no-user-group -g 33 -u 1337 strapi

EXPOSE 1337
CMD ["yarn", "develop"]
