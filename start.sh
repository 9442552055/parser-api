set -ex
cd /var/parser/parser-api-1 && npm start &
cd /var/parser/parser-api-2 && npm start &
nginx -g "daemon off;"