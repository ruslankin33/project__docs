---
title: "Ручная доставка"
slug: /manual-delivery
---

# Доставка файлов на сервер вручную

Для этого используется утилита scp.  
Заходим через терминал на удаленный сервер:
```
$ ssh rus@ruslankin.ru
```
Удаляем содержимое папки с сайтом:
```
rus@fdvjdvld: rm -rf /var/www/docs.ruslankin.ru/*
```
Выходим из ssh соединения
```
rus@fdvjdvld: exit
```
Копируем файлы:
```
$ scp -r /Users/ruslankinzebaev/Web/Docs/build/* rus@ruslankin.ru:/var/www/docs.ruslankin.ru
```