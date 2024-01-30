# docker-backend

Run Project

1. Generate Frontend Docker Image

   docker build -t react:v1

2. Generate Backend Docker Image

   docker build -t api:v1

3. Run Docker Compose file 

   docker-compose -d up

4. Test API Health

    API ENDPOINT:http://localhost/api/health

5. Stop Project 
   
   docker-compose down