import React, { useState } from "react"

import { Button } from "./components/Button"
import { HOST } from "./utils/api"

/**
 * Компонент для отображения ответа сервера.
 * С анимациями: плавно появляется.
 * Наименование и расположение не самые лучшие
 * @param {{children: React.ReactChildren, isFetching: boolean}} param0
 */
export const Amount = ({ children, isFetching = false }) => {
    return (
        <div className={"amount " + (!isFetching ? "amount__visible" : "")}>
            {children}
        </div>
    )
}

/**
 * Компонент для отображения баланса адреса.
 */
export const Balance = () => {
    // Инициализация состояний
    // const [значениеЕдиницыСостояния, сеттер] = реактоваяФункцияПодписывающаясяКСостоянию( начальное значение )
    // Такие специальные функции называются хуками (useState - это hook)
    const [inputValue, setInput] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [balance, setBalance] = useState(null)

    /**
     * Обработчик изменения текстового поля ввода
     */
    const inputHandler = e => {
        setInput(e.target.value)
        console.log(inputValue)
    }

    /**
     * Обработчик получения информации о балансе
     */
    const balanceHandler = () => {
        // Изменение состояния
        setIsFetching(true)
        // Совершение запроса
        fetch(`${HOST}/get-balance/${inputValue}`)
            // Тк запросы в JS осинхронные, на Promise'ах делаем цепочку из обработчиков.
            // Следующий запускается только при завершении предыдущего
            .then(res => res.text()) // преобразуем ответ сервера в текст
            .then(res => {
                console.log(res) // печатаем в консоль
                setBalance(res) // устанавливаем состояние баланса
                setIsFetching(false) // устанавливаем состояние "загрузки"
            })
            // Обработка ошибки
            .catch(err => {
                setBalance("Произошла ошибка")
                setIsFetching(false)
            })
    }

    // Если ответ сервера это текст состоящий из цифр,
    // то добавить подпись валюты, если нет, то пустая стока
    const currency = /\d+(\.\d+)?/.test(balance) ? " wei" : ""

    return (
        <form className="block balance">
            {/* htmlFor говорит "подписи" (label) что она относится к элементу ввода balance-input. 
            При нажатии на подпись поле ввода сфокусиреутся, и можно будет сразу вводить  */}
            <label htmlFor="balance-input">Получить баланс адреса:</label>
            <input
                // тип поля ввода
                type="text"
                // id элемента (для htmlFor)
                id="balance-input"
                // запоминать ранее введенные значения
                autoComplete="on"
                // класс элемента (для стилей)
                className="input-styled"
                // передаем обработчик
                onChange={inputHandler}
                // значение поля
                value={inputValue}
                // Заглушка, видимая при отсутствии текста
                placeholder="Адрес: 0x0f551..."
            />
            <Button
                text="Получить"
                type="submit"
                progress={isFetching}
                onClick={balanceHandler}
            />
            <Amount isFetching={isFetching}>
                {balance}
                {currency}
            </Amount>
        </form>
    )
}
