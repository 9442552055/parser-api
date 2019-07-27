FROM nginx:1.16.0

ENV NODE_VERSION 10.16.0

#RUN addgroup -g 1000 node 
#RUN adduser -u 1000 -G node -s /bin/sh -D node 
RUN mkdir nodejs
RUN cd nodejs
RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install -y nodejs
RUN node -v

RUN mkdir /var/parser
COPY ./ /var/parser
WORKDIR /var/parser
RUN npm install
EXPOSE 9095
CMD [ "npm" ,"start" ]
