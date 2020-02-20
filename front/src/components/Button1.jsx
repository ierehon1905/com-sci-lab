import React from "react"

export const Button1 = ({ clickHandler1, picture }) => {
    return (
        <button onClick={clickHandler1}>
            <p>{picture ? "DeletePicture" : "CreatePicture"}</p>
        </button>
    )
}
