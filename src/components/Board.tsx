import { memo } from 'react'
import Lane from './Lane'
import { useBoard } from '../hooks/use-board'

export default memo(() => {
  const { board } = useBoard()
  return (
    <section>
      <header>
        <h1>Kanban Board</h1>
      </header>
      <section>
        {Object.values(board.lanes).map((lane) => (
          <Lane key={lane.id} data={lane} />
        ))}
      </section>
    </section>
  )
})
