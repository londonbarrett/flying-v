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
    <section>
      <header>
        <h2>Add a new todo</h2>
      </header>
      <form onSubmit={submitHandler}>
        <input
          id="title"
          name="title"
          placeholder="Enter a title"
          type="text"
        />
        <Button label="Add" type="submit" />
      </form>
    </section>
  )
})
