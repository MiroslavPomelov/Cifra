# Используем официальный образ .NET 8.0 SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файлы проекта
COPY ["order-service.csproj", "./"]
RUN dotnet restore "order-service.csproj"

# Копируем остальные файлы проекта
COPY . .
RUN dotnet build "order-service.csproj" -c Release -o /app/build

# Публикуем приложение
FROM build AS publish
RUN dotnet publish "order-service.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Финальный образ с runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Устанавливаем wget для healthcheck
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

# Копируем опубликованное приложение
COPY --from=publish /app/publish .

# Открываем порт
EXPOSE 3000

# Устанавливаем переменную окружения для порта
ENV ASPNETCORE_URLS=http://+:3000

# Команда запуска
ENTRYPOINT ["dotnet", "order-service.dll"] 