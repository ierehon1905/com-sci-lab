import React, { useState } from "react"

import { Button } from "./components/Button"
import { Amount } from "./Balance"
import { getHost, HOST } from "./utils/api"

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
            method: "POST",
        })
            .then(res => res.json())
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