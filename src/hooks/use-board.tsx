import { createContext, Dispatch, useCallback, useContext, useReducer } from 'react'
import { Board, Todo } from '../../types'

const initialState: Board = {
  lanes: {
    todo: {
      id: 'todo',
      title: 'To Do',
      todos: {},
    },
    progress: {
      id: 'progress',
      title: 'In Progress',
      todos: {},
    },
    done: {
      id: 'done',
      title: 'Done',
      todos: {},
    },
  },
}

const BoardContext = createContext<{
  board: Board
  dispatch: Dispatch<any>
}>({
  board: initialState,
  dispatch: () => { },
})

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        lanes: {
          ...state.lanes,
          [action.laneId]: {
            ...state.lanes[action.laneId],
            todos: {
              ...state.lanes[action.laneId].todos,
              [action.todo.id]: action.todo,
            },
          },
        },
      }
    default:
      return state
  }
}

export const BoardProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [board, dispatch] = useReducer(reducer, initialState)
  return (
    <BoardContext.Provider value={{ board, dispatch }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => {
  const { board, dispatch } = useContext(BoardContext)
  if (!board || !dispatch) {
    throw new Error('useBoard must be used within a BoardProvider')
  }
  const addTodo = useCallback(
    (laneId: string, todo: Todo) => {
      dispatch({ type: 'ADD_TODO', laneId, todo })
    },
    [dispatch],
  )
  return { board, dispatch, addTodo }
}
