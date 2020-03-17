import React, { useState } from "react"

import { Button } from "./components/Button"
import { Amount } from "./Balance"
import { HOST } from "./utils/api"

// Для более детального описания см файл Balance.jsx

/**
 * Компонент для отображения деталей сгенерированного адреса
 */
export const NewAddress = () => {
    const [inputValue, setInput] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    /**
     * @type {[{key: string, address: string}, React.Dispatch<any>]}
     */
    const [response, setResponse] = useState(null)

    const inputHandler = e => {
        setInput(e.target.value)
    }

    const clickHandler = () => {
        setResponse(null)
        setIsFetching(true)
        fetch(`${HOST}/create-acc`, {
            // Указываем метод запроса
            method: "POST",
            // У POST запросов может быть тело
            // Кладем туда объект с ключом secret
            body: JSON.stringify({
                secret: inputValue,
            }),
            // Указываем заголовка запроса в виде вложенного массива строк
            headers: [["Content-Type", "application/json"]],
        })
            .then(res => res.json()) // ответ призодит в JSON. Парсим
            .then(res => {
                console.log(res)
                setResponse(res)
                setIsFetching(false)
            })
            .catch(err => {
                setResponse("Произошла ошибка")
                setIsFetching(false)
            })
    }

    return (
        <form className="block new-address">
            <label htmlFor="random-secret-input">Получить новый адрес:</label>
            <input
                type="text"
                id="random-secret-input"
                className="input-styled"
                onChange={inputHandler}
                value={inputValue}
                placeholder="Доп соль"
            />
            <Button
                text="Получить"
                type="submit"
                onClick={clickHandler}
                progress={isFetching}
            />
            <Amount isFetching={isFetching}>
                {/* См Block.js */}
                {response && (
                    <>
                        Адрес: {response.address} <br />
                        Ключ: {response.key}
                    </>
                )}
            </Amount>
        </form>
    )
}
