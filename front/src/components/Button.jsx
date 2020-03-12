import React from "react"

/**
 *
 * @param {{onClick : Function, text: import("react").ReactChild, progress: boolean}} param0
 */
export const Button = ({ onClick, text, progress }) => {
    let className = "button-styled"
    if (progress) {
        className += " button-styled__disabled"
    }

    return (
        <button
            onClick={onClick}
            className={className}
            disabled={progress}>
            {text}
        </button>
    )
}
