Чтобы запустить сервер нужно:

1. Установить редис (на osx я установил его так: "brew install redis")
2. Установить питоновские зависимости (из папки server сделал "sudo pip install -r reqs"). Тестировал только на python2.7.x
3. Запуск: "python server.py" (на продкашене: "python server.py &")

Настройка хоста:
1. в файле server.py поменять переменную ADDRESS (и можно PORT)
2. в js поменять переменную db_address


Best regards, addicted retards