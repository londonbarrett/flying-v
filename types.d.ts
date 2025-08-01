export type Board = {
  lanes: Record<string, Lane>
}

export type Lane = {
  id: string
  title: string
  todos: Record<string, Todo>
}

export type Todo = {
  id: string
  title: string
  completed: boolean
}
