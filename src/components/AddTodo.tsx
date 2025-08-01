import { memo, useCallback } from 'react'
import Button from './Button'
import { useBoard } from '../hooks/use-board'

export default memo(({ laneId }: { laneId: string }) => {
  const { addTodo } = useBoard()
  const submitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const formData = new FormData(event.currentTarget)
      const title = formData.get('title') as string
      if (!title) {
        alert('Please enter a title')
        return
      }
      addTodo(laneId, {
        id: new Date().getTime().toString(),
        title,
        completed: false,
      })
      event.currentTarget.reset()
    },
    [addTodo, laneId],
  )

  return (
    <section className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <header className="mb-3">
        <h2 className="text-sm font-medium text-gray-700">Add a new todo</h2>
      </header>
      <form onSubmit={submitHandler} className="space-y-3">
        <input
          id="title"
          name="title"
          placeholder="Enter a title"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Button label="Add" type="submit" />
      </form>
    </section>
  )
})
