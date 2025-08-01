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
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="px-3 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {label}
      </button>
    )
  },
)
