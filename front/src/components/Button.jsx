import React from "react"

/**
 *
 * @param {{onClick : Function, text: import("react").ReactChild, progress: boolean, type: string}} param0
 */
export const Button = ({ onClick, text, progress, type = "button" }) => {
    let className = "button-styled"
    if (progress) {
        className += " button-styled__disabled"
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={progress}>
            {text}
        </button>
    )
}
