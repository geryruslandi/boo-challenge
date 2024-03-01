docker compose -p "boo-challenge" down
if [ "$1" = "--build" ]
then
  docker compose -p "boo-challenge" build app_test
fi
docker compose -p "boo-challenge" up app_test
