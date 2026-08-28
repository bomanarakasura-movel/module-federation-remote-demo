import { useState } from 'react'
import styles from './CounterWidget.module.css'

export default function CounterWidget() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Counter Remote</h2>
      <p className={styles.count}>{count}</p>
      <button
        type="button"
        className={styles.button}
        onClick={() => setCount((c) => c + 1)}
      >
        Increment
      </button>
    </div>
  )
}
