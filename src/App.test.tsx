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

  it('should not add a todo if the title is empty', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => { })
    render(<App />)
    const inputs = screen.getAllByPlaceholderText('Enter a title')
    const firstInput = inputs[0] // Use the first input (To Do lane)
    fireEvent.change(firstInput, { target: { value: '' } })
    const addButtons = screen.getAllByText('Add')
    fireEvent.click(addButtons[0])
    const checkboxes = screen.queryAllByRole('checkbox')
    expect(checkboxes).toHaveLength(0)
    expect(alertMock).toHaveBeenCalledWith('Please enter a title')
    alertMock.mockRestore()
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

  it('should delete a todo', () => {
    render(<App />)
    // First add a todo
    const inputs = screen.getAllByPlaceholderText('Enter a title')
    const firstInput = inputs[0]
    fireEvent.change(firstInput, { target: { value: 'Todo to Delete' } })
    const addButtons = screen.getAllByText('Add')
    fireEvent.click(addButtons[0])
    expect(screen.getByText('Todo to Delete')).toBeInTheDocument()

    // Then delete it
    const deleteButtons = screen.getAllByText('Delete')
    fireEvent.click(deleteButtons[0])
    expect(screen.queryByText('Todo to Delete')).not.toBeInTheDocument()
  })

  it('should move todos among lanes', () => {
    render(<App />)
    const inputs = screen.getAllByPlaceholderText('Enter a title')
    const firstInput = inputs[0]
    fireEvent.change(firstInput, { target: { value: 'Test Todo' } })
    const addButtons = screen.getAllByText('Add')
    fireEvent.click(addButtons[0])
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    const moveNextButtons = screen.getAllByText('Move to next lane')
    fireEvent.click(moveNextButtons[0])
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
  })

})