import React, { useState } from "react"

import { Button } from "./components/Button"
import { getHost, HOST } from "./utils/api"
import "./App.css"

const App = () => {
    const [wallet, setWallet] = useState(false)

    const clickHandler = () => {
        if (wallet) {
            setWallet(false)
        } else {
            fetch(`${HOST}/test`)
                .then(res => res.text())
                .then(res => {
                    console.log(res)
                    setWallet(true)
                })
        }
    }

    return (
        <div className="App">
            <header className="App-header"></header>
            <main className="App-main">
                {wallet && "Wallet is created"}
                <Button clickHandler={clickHandler} wallet={wallet} />
            </main>
        </div>
    )
}

export default App
