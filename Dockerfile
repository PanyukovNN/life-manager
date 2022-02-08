# Dockerfile для сборки бэк проекта

# первым шагом используем контейнер с обычной jdk для сборки проекта,
# нам нет необходимости устанавливать gradle, используем gradle-wrapper
FROM openjdk:11.0.7-jdk-slim as GRADLE_BUILD

# копируем файлы, необходимые для сборки подпроекта
COPY back /back
COPY gradlew /gradlew
COPY .gradle /.gradle
COPY gradle /gradle
COPY build.gradle /build.gradle
COPY ext.gradle /ext.gradle
COPY settings.gradle /settings.gradle

# собираем проект с помощью wrapper'а
RUN ./gradlew :back:build -x test

# вторым шагм используем новый контейнер
FROM openjdk:11.0.7-jdk-slim
EXPOSE 80

# копируем только необходимый нам артефакт из первого шага, удаляя лишнее
COPY --from=GRADLE_BUILD back/build/libs/back.jar /home/back.jar

ENV TZ Europe/Moscow

# запускаем проект
ENTRYPOINT ["java", "-jar", "/home/back.jar"]
