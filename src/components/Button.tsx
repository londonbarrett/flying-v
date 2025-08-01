import { memo } from 'react'

export default memo(
  ({
    disabled = false,
    label,
    onClick,
    type = 'button',
  }: {
    disabled?: boolean
    label: string
    onClick?: VoidFunction
    type?: 'button' | 'submit' | 'reset'
  }) => {
    return (
      <button type={type} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    )
  },
)
