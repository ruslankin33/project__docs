---
sidebar_position: 3
pagination_next: null
pagination_prev: null
---

# Настройка брандмауэра с UFW
UFW (Uncomplicated Firewall или «простой брандмауэр») представляет собой интерфейс iptables,
предназначенный для упрощения процесса настройки брандмауэра.
Хотя iptables — надежный и гибкий инструмент, начинающим бывает сложно научиться использовать
его для правильной настройки брандмауэра. Если вы ищете способ защитить вашу сеть и не знаете,
какой инструмент для этого использовать, UFW может отлично вам подойти.  

Открыть соединения ssh и http:
```shell
$ sudo ufw allow ssh
$ sudo ufw allow http
```
Можно прям порты писать
```shell
$ sudo ufw allow 80
```
Включение брандмауэра (по умолчанию входящие запросы запрещены, а исходящие разрешены)
```shell
$ sudo ufw enable
```
Источники:
[DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu-18-04-ru)