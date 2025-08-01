import { memo } from "react"
import { Lane } from "../../types"
import AddTodo from "./AddTodo"
import Todo from "./Todo"

export default memo(({ data }: { data: Lane }) => {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6 min-w-80 max-w-80">
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">{data.title}</h1>
      </header>
      <div className="space-y-3 mb-6">
        {Object.values(data.todos).map((todo) => (
          <Todo key={todo.id} data={todo} laneId={data.id} />
        ))}
      </div>
      <AddTodo laneId={data.id} />
    </section>
  )
})