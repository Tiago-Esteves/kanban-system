#------------------------------------------------
# Stage 1: Build
#------------------------------------------------
FROM maven:3.9.3-eclipse-temurin-17 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia o pom.xml e os arquivos de código
COPY pom.xml .
COPY src ./src

# Compila e gera o JAR 
RUN mvn clean package -DskipTests

#------------------------------------------------
# Stage 2: Runtime
#------------------------------------------------
FROM eclipse-temurin:17-jre	

# Define o diretório de trabalho
WORKDIR /app

# Copia o JAR do stage anterior
COPY --from=build /app/target/kanban-0.0.1-SNAPSHOT.jar ./kanban.jar

# Define variáveis de ambiente obrigatórias
#ENV DATABASE_URL=${DATABASE_URL}
#ENV DATABASE_USER=${DATABASE_USER}
#ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
#ENV JWT_SECRET=${JWT_SECRET}
#ENV JWT_EXPIRATION=${JWT_EXPIRATION}
#ENV JWT_REFRESH_EXPIRATION=${JWT_REFRESH_EXPIRATION}

# Expõe a porta da aplicação
EXPOSE 8080

# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "kanban.jar"]