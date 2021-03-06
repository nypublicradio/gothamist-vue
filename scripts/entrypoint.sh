#!/usr/bin/env bash

set -e

cd /code
echo "Starting entrypoint script, ENV=$ENV..."

case "$ENV" in
prod)
    supervisord -c nginx/supervisord.conf
    ;;
demo)
    supervisord -c nginx/supervisord.conf
    ;;
nuxt)
    supervisord -c nginx/supervisord.conf
    ;;
*)
    npm run dev
    ;;
esac

