import React, { useState } from "react"

import { Button } from "./components/Button"
import { getHost, HOST } from "./utils/api"

import { NewAddress } from "./NewAddress"
import { Balance } from "./Balance"
import { Block } from "./Block"

const App = () => {
    return (
        <div className="App">
            <header className="App-header"></header>
            <main className="App-main">
                <section>
                    <NewAddress />
                </section>
                <section>
                    <Balance />
                </section>
                <section>
                    <Block />
                </section>
            </main>
        </div>
    )
}

export default App
