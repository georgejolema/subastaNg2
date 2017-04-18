FROM node
# Create app directory
RUN npm install -g gulp
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/

RUN npm install
EXPOSE 3000
CMD [ "gulp", "run" ]