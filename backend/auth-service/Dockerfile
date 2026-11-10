FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Best Practice: Run container as a non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy the pre-built JAR from your workflow directory
COPY target/*.jar app.jar

EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]