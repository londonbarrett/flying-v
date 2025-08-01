import { memo } from 'react'
import Lane from './Lane'
import { useBoard } from '../hooks/use-board'

export default memo(() => {
  const { board } = useBoard()
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Kanban Board</h1>
        <p className="text-gray-600">Organize your tasks efficiently</p>
      </header>
      <section className="flex gap-6 justify-center">
        {Object.values(board.lanes).map((lane) => (
          <Lane key={lane.id} data={lane} />
        ))}
      </section>
    </section>
  )
})
