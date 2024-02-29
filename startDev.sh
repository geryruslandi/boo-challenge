docker compose --env-file .env -p "boo-challenge" down
if [ "$1" = "--build" ]
then
  docker compose --env-file .env -p "boo-challenge" build db app_dev
fi
docker compose --env-file .env -p "boo-challenge" up db app_dev
