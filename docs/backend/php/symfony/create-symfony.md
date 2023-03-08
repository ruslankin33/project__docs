---
title: 'Создать базовый Symfony'
sidebar_position: 2
pagination_next: null
pagination_prev: null
---

### Установка базового Symfony
Установка Symfony будет производиться внутри контейнера, соответственно заходим внутрь контейнера командой  
`$ docker-compose  exec php bash`

Далее выполняем ряд команд:
```
$ cp -r /var/www/html /var/www/tmp
$ rm -rf /var/www/html/*
$ rm -rf /var/www/html/.*
$ cd /var/www
$ composer create-project symfony/skeleton html
$ cp -r /var/www/tmp/* /var/www/html
```
### Установка пакетов
Находясь в контейнере вводим  
`$ composer require <package>`  
, где в `<package>` по очереди подставляем названия нужных пакетов (звездочкой помечены те, которые устанавливаются в примере):

`orm` - Doctrine ORM*  
`symfony/serializer-pack` - сериалайзер*  
`symfony/maker-bundle --dev` - помощник по созданию сущностей*  
`symfony/uid` - работа с UUID  
`symfony/translation` - переводы  
`stof/doctrine-extensions-bundle` - дополнительный функционал для Doctrine ORM  
`symfony/test-pack --dev` - тесты  
`orm-fixtures --dev` - фикстуры

Ключ `--dev` прописан у пакетов, которые нужны в разработке и не нужны на продакшене.

В файле `.env`  у переменной `DATABASE_URL` прописываем host и пароль БД:  
`DATABASE_URL="postgresql://app:12345678@database:5432/app?serverVersion=15&charset=utf8"`

Пересобираем docker-compose:
```
docker-compose down
docker-compose up -d --build
```
### Создание сущности
Открываем терминал и пишем:  
`$ php bin/console make:controller UserController`  
`$ php bin/console make:entity User`  
далее отвечаем на вопросы 1.User 2.string 3.255 4.y

### Миграции:
Открываем терминал и пишем:  
`$ php bin/console doctrine:migrations:diff`  
`$ php bin/console doctrine:migrations:migrate`

### Сервисы
В папке src создаем папку Service, а в нем файл UserService.
Пишем CRUD.