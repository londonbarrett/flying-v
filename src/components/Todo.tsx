import { memo, useCallback } from 'react'
import { Todo } from '../../types'
import { useBoard } from '../hooks/use-board'

export default memo(
  ({ data, laneId }: { data: Todo; laneId: string }) => {
    const { updateTodo } = useBoard()
    const changeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        updateTodo(laneId, { ...data, completed: event.target.checked })
      },
      [data, laneId, updateTodo],
    )
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
      </div>
    )
  },
)
