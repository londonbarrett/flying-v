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
      <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3 flex-1">
            <input
              id={data.id}
              type="checkbox"
              checked={data.completed}
              onChange={changeHandler}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={data.id} className={`flex-1 text-sm ${data.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {data.title}
            </label>
          </div>
          <Button label="Delete" onClick={deleteHandler} />
        </div>
        <div className="flex gap-2">
          {laneId !== 'todo' && (
            <Button
              label="← Previous"
              onClick={movePreviousHandler}
            />
          )}
          {laneId !== 'done' && (
            <Button label="Next →" onClick={moveNextHandler} />
          )}
        </div>
      </div>
    )
  },
)
