# Сборка проекта в папку build
FROM node:12-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

# Запуск проекта в nginx контейнере
FROM nginx:stable-alpine
# Копируем конфигурационный файл nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Копируем собранный проект
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
