# EventHub — Backend

Небольшой сервис для публикации, просмотра и записи на мероприятия. Что умеет:
- регистрация
- вход
- афиша с поиском и фильтром 
- создание мероприятий
- запись на мероприятие
- редактирование и удаление своих мероприятий
- «Мои мероприятия» (созданные и записанные)
- подсчёт свободных мест

Подробная документация API доступна в Swagger.

## Стек

- NestJS, TypeScript
- PostgreSQL, TypeORM
- JWT (access и refresh токены)
- Swagger

## Что нужно установить заранее

- Node.js (v24.14.0) 
- PostgreSQL ([скачать](https://www.postgresql.org/download))
- любой клиент для PostgreSQL (например, DBeaver)


## Установка и запуск

1. Клонировать репозиторий
    git clone https://github.com/dianaimmatova/eventhub-backend.git

2. Установить зависимости
    npm install

3. Создать базу данных
    создать в PostgreSQL пустую базу (например, eventhub) через DBeaver

4. Создать файл `.env`
    копировать .env.example в .env и заполнить значения (пароль от БД, секреты):
      cp .env.example .env

5. Запустить проект
    npm run start:dev

6. Oткрыть в браузере:
    - сервер на http://localhost:3000
    - документация на http://localhost:3000/api

7. Добавить категории (после первого запуска, когда таблицы уже созданы)

```sql
INSERT INTO category (name)
VALUES ('Концерт'), ('Лекция'), ('Выставка'), ('Спорт'),
  ('Мастер-класс'), ('Кино'), ('Нетворкинг'), ('Фестиваль');
```

## Переменные окружения

DB_HOST - адрес сервера PostgreSQL, обычно localhost
DB_PORT - порт PostgreSQL, по умолчанию 5432
DB_DATABASE - название базы данных (например, eventhub)
DB_USERNAME - пользователь PostgreSQL (обычно postgres)
DB_PASSWORD - пароль 
DB_SYNC - true создаёт таблицы автоматически; на настоящем сервере выключают

JWT_ACCESS_SECRET - секретный ключ для подписи access-токенов, сгенерировать: openssl rand -base64 32
JWT_REFRESH_SECRET - секретный ключ для подписи refresh-токенов (должен отличаться от access), сгенерировать: openssl rand -base64 32
JWT_ACCESS_EXPIRES - срок, который живет access токен. Пример: 15m     
JWT_REFRESH_EXPIRES - срок, который живет refresh токен. Пример: 7d

## Документация API

[Адрес Swagger.](http://localhost:3000/api)

## Допущения

У мероприятия одна категория, категории добавляются вручную, время хранится в UTC, изображение пока строка-ссылка.