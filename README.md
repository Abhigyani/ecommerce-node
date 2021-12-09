# ecommerce-node
This is an e-commerce web application developed using NodeJs.


docker run --name mysql -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest

docker run -it --network some-network --rm mysql mysql -hmysql -uexample-user -p

To run SQL DB.
docker run -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=test_db -d mysql:latest

docker container exec -it mysql bash