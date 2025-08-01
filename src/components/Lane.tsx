import { memo } from "react"
import { Lane } from "../../types"
import Todo from "./Todo"

export default memo(({ data }: { data: Lane }) => {
  return (
    <section>
      <header>
        <h1>{data.title}</h1>
      </header>
      <div>
        {Object.values(data.todos).map((todo) => (
          <Todo key={todo.id} data={todo} />
        ))}
      </div>
    </section>
  )
})