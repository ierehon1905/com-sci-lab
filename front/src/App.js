import React, { useState } from "react"

import { Button } from "./components/Button"
import { getHost, HOST } from "./utils/api"
import "./App.css"

const App = () => {
    const [wallet, setWallet] = useState(false)
    const [inputValue, setInput] = useState("")

    const clickHandler = () => {
        if (wallet) {
            setWallet(false)
        } else {
            fetch(`${HOST}/create-acc`, {
                method: "POST",
            })
                .then(res => res.text())
                .then(res => {
                    console.log(res)
                    setWallet(true)
                })
        }
    }
    const inputHandler = e => {
        setInput(e.target.value.replace("o", "a"))
        console.log(inputValue)
    }

    return (
        <div className="App">
            <header className="App-header"></header>
            <main className="App-main">
                <input type="text" onChange={inputHandler} value={inputValue} />
                {wallet && "Wallet is created"}
                <Button clickHandler={clickHandler} wallet={wallet} />
            </main>
        </div>
    )
}

export default App
