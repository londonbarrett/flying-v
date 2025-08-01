import { memo } from "react"
import Lane from "./Lane"

export default memo(() => {
  return (
    <section>
      <header>
        <h1>Kanban Board</h1>
      </header>
      <section>
        <Lane />
      </section>
    </section>
  )
})