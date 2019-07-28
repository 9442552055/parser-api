set -ex
node /var/parser/parser-api-1/build/main.js /var/parser/parser-api-1/build/.env & 
node /var/parser/parser-api-2/build/main.js /var/parser/parser-api-2/build/.env & 
nginx -g "daemon off;"