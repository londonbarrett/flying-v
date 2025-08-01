import { memo } from 'react'
import { Todo } from '../../types'

export default memo(({ data }: { data: Todo }) => {
  return (
    <article>
      <header>
        <h1>{data.title}</h1>
      </header>
    </article>
  )
})
