---
title: "Копирование файлов по SSH"
slug: /copy-files-by-ssh
---

# Копирование файлов по SSH

Копирование файла с удаленного хоста на локальный хост Пример SCP:
```
$ scp username@from_host:file.txt /локальный/каталог/
```

Копирование файла с локального хоста на удаленный хост Пример SCP:
```
$ scp file.txt username@to_host:/remote/directory/
```

Копирование каталога с удаленного хоста на локальный хост Пример SCP:
```
$ scp -r username@from_host:/remote/directory / /локальный/каталог/
```

Копирование каталога с локального хоста на удаленный хост Пример SCP:
```
$ scp -r /local/directory/ username@to_host:/remote/directory/
```

Копирование файла с удаленного хоста на удаленный хост Пример SCP:
```
$ scp username@from_host:/remote/directory/file.txt username@to_host:/remote/directory/
```