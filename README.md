#Hello World
Steps to run this application
1. Install docker Ref: https://docs.docker.com/install/
2. Install docker-compose Ref: https://docs.docker.com/compose/install/
3. Get thesource code from 
    a. Download from https://github.com/9442552055/parser-api/archive/master.zip
       unzip the master.zip folder and navigate to parser-api folder.[you can find a Dockerfile]
    b. Clone from https://github.com/9442552055/parser-api.git
4. run command "docker-compose up" in the folder of docker-compose.yml [root folder: parser-api]

Referance for cURL: https://develop.zendesk.com/hc/en-us/articles/360001068567-Installing-and-using-cURL

#To test API V1

curl -X POST \
  http://127.0.0.1:9097/api/v1/parser/parse \
  -H 'accept: application/json' \
  -H 'authorization: Basic YWRtaW5AaW50ZXJuYWw6YWRtaW4=' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"data":"JOHN0000MICHAEL0009994567"
}'

#To test API V2

curl -X POST \
  http://127.0.0.1:9097/api/v2/parser/parse \
  -H 'accept: application/json' \
  -H 'authorization: Basic YWRtaW5AaW50ZXJuYWw6YWRtaW4=' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"data":"JOHN0000MICHAEL0009994567"
}'