set -ex
node /var/parser/parser-api-1/build/boot.js /var/parser/parser-api-1/build/.env & 
node /var/parser/parser-api-2/build/boot.js /var/parser/parser-api-2/build/.env & 
nginx -g "daemon off;"