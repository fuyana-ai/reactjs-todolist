// import React from 'react'
// import TodoCard from './TodoCard'

// export default function TodoList(props) {
//     const { todos, handlePriorityChange } = props


//     return (
//         <ul className='main'>
//             {todos.map((todo, todoIndex) => {
//                 return (
//                     <TodoCard {...props} key={todoIndex} index={todoIndex}
//                     handlePriorityChange={handlePriorityChange}>
//                         <p>{todo.text}</p>
//                     </TodoCard>
//                 )
//             })}
//         </ul>
//     )
// }

import React from 'react'
import TodoCard from './TodoCard'
import ErrorBoundary from './ErrorBoundary'

export default function TodoList(props) {
    const {
        todos,
        handlePriorityChange,
        handleEditTodo,
        handleDeleteTodo,
        handleToggleComplete
    } = props

    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <ErrorBoundary key={todoIndex}>
                    <TodoCard 
                        {...props} 
                        key={todoIndex} 
                        index={todoIndex}
                        todo={todo}
                        handlePriorityChange={handlePriorityChange}
                        handleEditTodo={handleEditTodo}
                        handleDeleteTodo={handleDeleteTodo}
                        handleToggleComplete={handleToggleComplete}
                    >
                        <p>{todo.text}</p>
                    </TodoCard>
                    </ErrorBoundary>
                )
            })}
        </ul>
    )
}
