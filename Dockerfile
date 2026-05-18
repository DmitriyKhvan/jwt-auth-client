# === Build stage ===
# Используем Node.js для сборки фронтенда
FROM node:22 AS build

# Принимаем VITE_API_URL из docker-compose build args (для Docker)
# По умолчанию берётся из client/.env (для локальной разработки)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Копируем package.json и устанавливаем зависимости (слой кэшируется)
COPY package*.json ./
RUN npm install

# Копируем исходники и собираем production-сборку
COPY . .
RUN npm run build


# === Production stage ===
# Используем легковесный nginx для раздачи статики
FROM nginx:alpine

# Копируем собранные файлы из build-стадии
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx (security, gzip, proxy, кэш)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Проверка здоровья контейнера
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD wget -qO- http://localhost:80/ || exit 1

# Запускаем nginx на переднем плане (иначе контейнер завершится)
CMD ["nginx", "-g", "daemon off;"]