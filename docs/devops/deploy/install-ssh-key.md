---
sidebar_position: 2
pagination_next: null
pagination_prev: null
---

# Установка SSH ключа
## 1. Сгенерировать ключ
На своем компьютере вводим:
```shell
$ ssh-keygen
```
Это создаст открытый и закрытый ключи в домашнем каталоге в папке .ssh  

## 2. Теперь нужно прокинуть ключ на сервер
```shell
$ ssh-copy-id <username>@<remote_host> 
```
Ответить yes на первый вопрос, потом ввести пароль  

## 3. Соединение с сервером теперь будет работать по команде
```shell
$ ssh <username>@<remote_host>  
```
Источники:  
[DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-22-04)