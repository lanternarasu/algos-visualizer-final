FROM openjdk:17-jdk
EXPOSE 8086
ADD target/queue-docker.jar queue-docker.jar
ENTRYPOINT ["java","-jar","queue-docker.jar"]