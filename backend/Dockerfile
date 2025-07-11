# --- Stage 1: Build ứng dụng và bung .jar ---
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy source code vào image
COPY . .

# Build jar và bung nội dung vào target/dependency
RUN mvn clean package -DskipTests && \
    mkdir -p target/dependency && \
    (cd target/dependency && jar -xf ../target/*.jar)

# --- Stage 2: Tạo image runtime tối ưu ---
FROM eclipse-temurin:17-jdk-alpine

# Tạo user non-root
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy các layer đã bung từ Stage 1
COPY --from=build /app/target/dependency/BOOT-INF/lib /app/lib
COPY --from=build /app/target/dependency/META-INF /app/META-INF
COPY --from=build /app/target/dependency/BOOT-INF/classes /app

# Chạy app bằng main class (chỉnh sửa theo app bạn)
ENTRYPOINT ["java", "-cp", "app:app/lib/*", "com.vocabtai.VocabTaiApplication"]
