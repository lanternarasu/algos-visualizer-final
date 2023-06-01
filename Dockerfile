FROM openjdk:17-jdk
EXPOSE 8087
ADD target/sorting-docker.jar sorting-docker.jar
ENTRYPOINT ["java","-jar","sorting-docker.jar"]