import React from "react"

/**
 * Компонент стилизованной кнопки
 * @param {{onClick : Function, text: import("react").ReactChild, progress: boolean, type: string}} param0
 */
export const Button = ({ onClick, text, progress, type = "button" }) => {
    let className = "button-styled"
    // если параметр progress true (обычно значит "идет загрузка")
    // присваиваем соответствующий стиль
    if (progress) {
        className += " button-styled__disabled"
    }

    return (
        // Возвращаем стандартную кнопку (со своими классами стилей)
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={progress}>
            {text}
        </button>
    )
}
