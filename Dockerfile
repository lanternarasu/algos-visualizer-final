FROM openjdk:17-jdk
EXPOSE 8080
ADD target/stack-docker.jar stack-docker.jar
ENTRYPOINT ["java","-jar","stack-docker.jar"]