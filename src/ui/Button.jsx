"use client"

import { useState } from "react"

export function Button({ content, value }) {
    const [count, setCount] = useState(0)

    return (
        <div style={{ padding: value }}>
            <button onClick={() => setCount(count + 1)}>
                {content}
            </button>
            <p>Compteur : {count}</p>
        </div>
    )
}