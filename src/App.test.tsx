import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('should render kanban board', () => {
    render(<App />)
    expect(screen.getByText('Kanban Board')).toBeInTheDocument()
  })

  it('should render all lanes', () => {
    render(<App />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })

  it('should add a todo', () => {
    render(<App />)
    const inputs = screen.getAllByPlaceholderText('Enter a title')
    const firstInput = inputs[0] // Use the first input (To Do lane)
    fireEvent.change(firstInput, { target: { value: 'Test Todo' } })
    const addButtons = screen.getAllByText('Add')
    fireEvent.click(addButtons[0]) // Use the first Add button
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

  it('should update a todo', () => {
    render(<App />)
    const inputs = screen.getAllByPlaceholderText('Enter a title')
    const firstInput = inputs[0] // Use the first input (To Do lane)
    fireEvent.change(firstInput, { target: { value: 'Test Todo' } })
    const addButtons = screen.getAllByText('Add')
    fireEvent.click(addButtons[0]) // Use the first Add button
    const checkboxes = screen.getByLabelText('Test Todo')
    fireEvent.click(checkboxes)
    expect(checkboxes).toBeChecked()
  })
})