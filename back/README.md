### И что с этим делать?

1. Заходишь в терминале в папку
2. Убедись, что ```python``` и ```pip``` ссылаются на питон (3.8)
3. Пишешь
    ```bash
    pip install -r requirements.txt
    ```
4. Билдишь фронт (см front).
5. Запускаешь проект
    ```bash
    python3 main.py # без hot reload
    # или
    FLASK_APP=main.py FLASK_ENV=development flask run --port 8081 # с hot reload
    ```

Пиши если не получается