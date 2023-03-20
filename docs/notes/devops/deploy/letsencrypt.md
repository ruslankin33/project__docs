---
title: "Let's Encrypt"
slug: /letsencrypt
---

# Как я получал сертификат

## Входные данные

Сайт расположен на VPS у beget.com.  
ОС: Ubuntu.  
Веб-сервер: nginx.  
Необходимо было получить сертификат для домена ruslankin.ru и его поддоменов третьего уровня.  
Можно получить сертификат на домен и несколько поддоменов, прописав каждый из них при получении.  
Мы же получим Wildcard для домена, чтобы это работало для ВСЕХ поддоменов третьего уровня.

## Установка CertBot

```
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```
(устанавливал по другой инструкции, эта из интернета)

## Процесс получения сертификта

### Тестовое получение сертификата

```
sudo certbot --dry-run --manual --agree-tos --preferred-challenges dns certonly \
--server https://acme-v02.api.letsencrypt.org/directory -d *.ruslankin.ru -d ruslankin.ru
```
Далее запросит почту и задаст некоторые вопросы.  
Почту указываем, на вопросы отвечаем как хотим.

Потом появится вот такое преложение:
```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Simulating a certificate request for *.ruslankin.ru and ruslankin.ru

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name:

_acme-challenge.ruslankin.ru.

with the following value:

zBoQRUL_Cu2CS4duOmWeiEvfpcKVNQ7006ZYcZSqTEY

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

В beget.com в своей панели управления заходим в раздел DNS.  
Добавляем подзону _acme-challenge.ruslankin.ru.  
В нее добавляем запись TXT с выданным выше токеном.  
Жмем Enter. Получаем такое сообщение с новым токеном. Его тоже вводим.
Должен получиться ответ
```
The dry run was successful.
```

### Получение сертификата

Вводим команду:
```
sudo certbot --manual --agree-tos --manual-public-ip-logging-ok --preferred-challenges \
dns certonly --server https://acme-v02.api.letsencrypt.org/directory -d *.ruslankin.ru -d ruslankin.ru
```
Проходим примерно те же этапы, что и в при тестовом получении сертификата.  
Получаем:
```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for *.ruslankin.ru and ruslankin.ru

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name:

_acme-challenge.ruslankin.ru.

with the following value:

2AZ8XADiSSWUjYHSGYzAY8n3roxy_M0g1nv8iWUedDE

Before continuing, verify the TXT record has been deployed. Depending on the DNS
provider, this may take some time, from a few seconds to multiple minutes. You can
check if it has finished deploying with aid of online tools, such as the Google
Admin Toolbox: https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.ruslankin.ru.
Look for one or more bolded line(s) below the line ';ANSWER'. It should show the
value(s) you've just added.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

Не нажимаем Enter. Необходимо убедиться, что токены прописались.  

Способ 1:  
https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.ruslankin.ru  
Если там появились наши токены, то все отлично.

Способ 2:
```
dig -t txt _acme-challenge.ruslankin.ru
```
или
```
dig @8.8.8.8 -t txt _acme-challenge.ruslankin.ru
```

Когда убедились, что токены вписаны, жмем Enter.  
В ответ получим следующее сообщение:
```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/ruslankin.ru/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/ruslankin.ru/privkey.pem
This certificate expires on 2023-06-17.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically.
Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook)
but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date
```
Это означает, что сертификаты выпущены и хранятся в папке `/etc/letsencrypt/live/ruslankin.ru`

## Автообновление сертификата

Сделал как в примере из источника, пока не пройдет 3 месяца, не поймешь, работает или нет.

Создаем исполняемый bash скрипт и открываем на редактирование:
```
sudo touch /etc/cron.weekly/cert-nginx \
&& sudo chmod +x /etc/cron.weekly/cert-nginx \
&& sudo nano /etc/cron.weekly/cert-nginx
```
Следующего содержания:
```
#!/bin/bash
/usr/bin/certbot renew --post-hook "service nginx reload"
```
Сохраняем.

## Добавление сертификата в nginx

Теперь для каждого поддомена можно использовать один и тот же сертификат.  
Для подключения в nginx необходимо в его файл конфигурации в папке conf.d,
там, где конфигурации нужного поддомена, дописать прослушивание порта 443
и четыре строки сертификата:
```
server {
    listen 443 ssl;
    server_name docs.ruslankin.ru www.docs.ruslankin.ru;
    root /var/www/docs.ruslankin.ru;
    
    ssl_certificate /etc/letsencrypt/live/ruslankin.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ruslankin.ru/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}
```

## Перенаправление с http на https

Для этого пропишем в том же файле конфигурации еще один блок `server`:
```
server {
    listen 80;
    server_name ruslankin.ru www.ruslankin.ru;
    return 301 https://$host$request_uri;
}
```

Источник: [obu4alka.ru](https://obu4alka.ru/free-wildcard-lets-encrypt.html)