# Dockerfile для сборки бэк проекта

# первым шагом используем контейнер с обычной jdk для сборки проекта,
# нам нет необходимости устанавливать gradle, используем gradle-wrapper
FROM openjdk:11.0.7-jdk-slim as GRADLE_BUILD

# копируем весь подпроект в папку /back
COPY / /back
# копируем родительский build.gradle, gradlew скрипт и gradle-wrapper в корневую папку
COPY ../build.gradle /.
COPY ../gradlew /.
COPY ../gradle /.

# собираем проект с помощью wrapper'а
RUN ./gradlew build -x test

# вторым шагм используем новый контейнер
FROM openjdk:11.0.7-jdk-slim
EXPOSE 80

# копируем только необходимый нам артефакт из первого шага, удаляя лишнее
COPY --from=GRADLE_BUILD build/libs/back.jar /home/back.jar

ENV TZ Europe/Moscow

# запускаем проект
ENTRYPOINT ["java", "-jar", "/home/back.jar"]
