import React, { useState } from "react"
import { Button } from "./components/Button"
import { Button1 } from "./components/Button1"
import "./App.css"
export const fetchAsBlob = url => fetch(url).then(response => response.blob())

export const convertBlobToBase64 = blob =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsDataURL(blob)
    })

const App = () => {
    const [wallet, setWallet] = useState(false)

    const clickHandler = () => {
        if (wallet) {
            setWallet(false)
        } else {
            fetch("http://192.168.1.55:5000", {
                credentials: "omit",
                method: "GET",
                mode: "no-cors",
            }).then(res => {
                console.log(res)
                setWallet(true)
            })
        }
    }
    const [picture, setPicture] = useState(false)
    const clickHandler1 = () => {
        if (picture) {
            setPicture(false)
        } else {
            fetchAsBlob("https://source.unsplash.com/random")
                // .then(res => res.blob())
                .then(convertBlobToBase64)
                .then(res => {
                    console.log(res)
                    setPicture(res)
                })
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {picture && <img src={picture} />}
                <Button1 clickHandler1={clickHandler1} picture={picture} />
            </header>
            <main className="App-main">
                {wallet && "Wallet is created"}
                <Button clickHandler={clickHandler} wallet={wallet} />
            </main>
        </div>
    )
}

export default App
