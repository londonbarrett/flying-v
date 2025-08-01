import { memo, useCallback } from 'react'
import { Todo } from '../../types'
import { useBoard } from '../hooks/use-board'
import Button from './Button'

export default memo(
  ({ data, laneId }: { data: Todo; laneId: string }) => {
    const { updateTodo, deleteTodo } = useBoard()
    const changeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTodo(laneId, { ...data, completed: event.target.checked })
      },
      [data, laneId, updateTodo],
    )
    const deleteHandler = useCallback(() => {
      deleteTodo(laneId, data)
    }, [data, laneId, deleteTodo])
    return (
      <div>
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
