import React from "react"

// { } означают деструкцию, то есть необходимый модуль является под модулем импортируемого
// Похоже на Python
import { NewAddress } from "./NewAddress"
import { Balance } from "./Balance"
import { Block } from "./Block"

/**
 * Основная разметка приложения.
 * Перечисление блоков с контентом, которые будут рисоваться
 */
const App = () => {
    return (
        // React позволяет писать нотацией похожей на html/xml в файлах js (jsx, ts, tsx).
        <div className="App">
            <header className="App-header"></header>
            {/* Классы позволяют применять стили из css файлов */}
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

// Экспортируем чтобы можно было ссылаться из других файлов
// default означает что при импортировании файла этот модуль/пространство имен будет доступно в псевдониме модуля
// То есть деструкция не нужна
// Без default 
// import { App } from './module/path';
// С default
// import App from './module/path';
export default App
