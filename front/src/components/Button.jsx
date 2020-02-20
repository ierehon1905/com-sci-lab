import React from "react"

export const Button = ({ clickHandler, wallet }) => {
    return (
        <button onClick={clickHandler}>
            <p>{wallet ? "DeleteWallet" : "CreateWallet"}</p>
        </button>
    )
}
