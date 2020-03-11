import React, { useState } from "react"

import { Button } from "./components/Button"
import { HOST } from "./utils/api"

/**
 *
 * @param {{children: React.ReactChildren, isFetching: boolean}} param0
 */
export const Amount = ({ children, isFetching = false }) => {
    return (
        <div className={"amount " + (!isFetching ? "amount__visible" : "")}>
            {children}
        </div>
    )
}

export const Balance = () => {
    const [inputValue, setInput] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const [balance, setBalance] = useState(null)

    const inputHandler = e => {
        setInput(e.target.value)
        console.log(inputValue)
    }

    const balanceHandler = () => {
        setIsFetching(true)
        fetch(`${HOST}/get-balance/${inputValue}`)
            .then(res => res.text())
            .then(res => {
                console.log(res)
                setBalance(res)
                setIsFetching(false)
            })
    }

    return (
        <div className="block balance">
            <label htmlFor="balance-input">Получить баланс адреса:</label>
            <input
                type="text"
                id="balance-input"
                className="input-styled"
                onChange={inputHandler}
                value={inputValue}
                placeholder="Адрес"
            />
            <Button
                text="Получить"
                progress={isFetching}
                onClick={balanceHandler}
            />
            <Amount isFetching={isFetching}>{balance}</Amount>
        </div>
    )
}
