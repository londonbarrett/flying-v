import { memo } from "react"
import Todo from "./Todo"

export default memo(() => {
  return (
    <section>
      <header>
        <h1>Lane</h1>
      </header>
      <div>
        <Todo />
      </div>
    </section>
  )
})