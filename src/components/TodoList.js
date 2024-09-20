import React from 'react'

export default function TodoList() {
  let todos = [
    'Go to the gym',
    'Pick up the kids from school',
    'Eat more fruits and veges'

  ]

  return (
    <ul className='main'>
      {todos.map((todo, todoIndex) => {
          return ( 
              <li className='TodoItem' key={todoIndex}>{todo}</li>
          )
        })}
    </ul>
  )
}
