import { memo, useCallback } from 'react'
import { Todo } from '../../types'
import { useBoard } from '../hooks/use-board'
import Button from './Button'

export default memo(
  ({ data, laneId }: { data: Todo; laneId: string }) => {
    const { updateTodo, deleteTodo, addTodo } = useBoard()
    const changeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTodo(laneId, { ...data, completed: event.target.checked })
      },
      [data, laneId, updateTodo],
    )
    const deleteHandler = useCallback(() => {
      deleteTodo(laneId, data)
    }, [data, laneId, deleteTodo])
    const moveNextHandler = useCallback(() => {
      addTodo(
        laneId === 'todo' ? 'progress' : 'done',
        laneId === 'progress' ? { ...data, completed: true } : data,
      )
      deleteTodo(laneId, data)
    }, [deleteTodo, addTodo, data, laneId])
    const movePreviousHandler = useCallback(() => {
      addTodo(
        laneId === 'done' ? 'progress' : 'todo',
        laneId === 'done' ? { ...data, completed: false } : data,
      )
      deleteTodo(laneId, data)
    }, [deleteTodo, addTodo, data, laneId])
    return (
      <div>
        <div>
          {laneId !== 'todo' && (
            <Button
              label="Move to previous lane"
              onClick={movePreviousHandler}
            />
          )}
          {laneId !== 'done' && (
            <Button label="Move to next lane" onClick={moveNextHandler} />
          )}
        </div>
        <label htmlFor={data.id}>
          {data.title}
          <input
            id={data.id}
            type="checkbox"
            checked={data.completed}
            onChange={changeHandler}
          />
        </label>
        <Button label="Delete" onClick={deleteHandler} />
      </div>
    )
  },
)
