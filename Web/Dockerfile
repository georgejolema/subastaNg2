FROM node
# Create app directory
RUN npm install -g gulp
RUN npm install -g bower
RUN npm install -g typings
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN echo '{ "allow_root": true }' > /root/.bowerrc
# Install app dependencies
ADD ./WebApp /usr/src/app/WebApp
ADD ./WebServer /usr/src/app/WebServer
WORKDIR /usr/src/app/WebServer
RUN npm install
WORKDIR /usr/src/app/WebServer
RUN bower install
WORKDIR /usr/src/app/WebApp
RUN npm install
RUN gulp build.prod
WORKDIR /usr/src/app/WebServer
EXPOSE 8080
CMD [ "node", "app.js" ]