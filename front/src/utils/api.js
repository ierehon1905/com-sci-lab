console.log(process.env)
// если в переменных окружения не указаны адрес и порт
// используем стандартные значения
const host = process.env.REACT_APP_PYTHON_ADDRESS || "localhost"
const port = process.env.REACT_APP_PYTHON_PORT || "8081"

// если запускаем собранный билд (с питона)
// тогда запросы шлем на этот же питон
// в другом случае на указанный адрес
// сделано для удобства разработки
export const HOST =
    process.env.NODE_ENV === "production" ? "" : `http://${host}:${port}`
