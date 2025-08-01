import { createContext, Dispatch, useContext, useReducer } from 'react'
import { Board } from '../../types'

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
  return { board, dispatch }
}
