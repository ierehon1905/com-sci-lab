import React, { useState } from "react"

import { Button } from "./components/Button"
import { HOST } from "./utils/api"
import { Amount } from "./Balance"

export const Block = () => {
    const [inputValue, setInput] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    /**
     * @type {[ {timestamp: number, difficulty: number, number: number} | string, any]}
     */
    const [blockInfo, setBlockInfo] = useState(null)

    const inputHandler = e => {
        setInput(e.target.value)
        console.log(inputValue)
    }

    const blockHandler = () => {
        setIsFetching(true)
        fetch(`${HOST}/get-block/${inputValue}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setBlockInfo(res)
                setIsFetching(false)
            })
            .catch(err => {
                setBlockInfo("Произошла ошибка")
                setIsFetching(false)
            })
    }

    return (
        <form className="block balance">
            <label htmlFor="balance-input">Информацию о блоке:</label>
            <input
                type="text"
                id="block-input"
                autoComplete="on"
                className="input-styled"
                onChange={inputHandler}
                value={inputValue}
                placeholder="latest или 12345"
                defaultValue="latest"
            />
            <Button
                text="Получить"
                type="submit"
                progress={isFetching}
                onClick={blockHandler}
            />
            <Amount isFetching={isFetching}>
                {typeof blockInfo !== "string" && blockInfo !== null && (
                    <>
                        Номер {blockInfo.number} <br />
                        Сложность {blockInfo.difficulty} <br/>
                        Дата{" "}
                        {new Date(blockInfo.timestamp * 1000).toLocaleString()}
                    </>
                )}
            </Amount>
        </form>
    )
}
