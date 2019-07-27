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
#COPY ./ /var/parser
WORKDIR /var/parser
RUN curl -sL https://github.com/9442552055/parser-api/archive/v1.zip -o parser-v1.zip
RUN curl -sL https://github.com/9442552055/parser-api/archive/v2.zip -o parser-v2.zip
RUN apt-get install unzip
RUN unzip parser-v1.zip
RUN unzip parser-v2.zip
RUN ls -la

WORKDIR /var/parser/parser-api-1
RUN ls -la
RUN npm install

WORKDIR /var/parser/parser-api-2
RUN ls -la
RUN npm install

WORKDIR /var/parser
COPY start.sh ./

EXPOSE 9095
CMD [ "bash" ,"start.sh" ]
