import Board from "./components/Board"
import { BoardProvider } from "./hooks/use-board"

function App() {
  return (
    <BoardProvider>
      <main>
        <Board />
      </main>
    </BoardProvider>
  )
}

export default App
