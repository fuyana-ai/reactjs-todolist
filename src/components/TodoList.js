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

// import React from 'react'
// import TodoCard from './TodoCard'
// import ErrorBoundary from './ErrorBoundary'

// export default function TodoList(props) {
//     const {
//         todos,
//         handlePriorityChange,
//         handleEditTodo,
//         handleDeleteTodo,
//         handleToggleComplete
//     } = props

//     return (
//         <ul className='main'>
//             {todos.map((todo, todoIndex) => {
//                 return (
//                     <ErrorBoundary key={todoIndex}>
//                     <TodoCard 
//                         {...props} 
//                         key={todoIndex} 
//                         index={todoIndex}
//                         todo={todo}
//                         handlePriorityChange={handlePriorityChange}
//                         handleEditTodo={handleEditTodo}
//                         handleDeleteTodo={handleDeleteTodo}
//                         handleToggleComplete={handleToggleComplete}
//                     >
//                         <p>{todo.text}</p>
//                     </TodoCard>
//                     </ErrorBoundary>
//                 )
//             })}
//         </ul>
//     )
// }


import React, { useState, useCallback } from 'react';
import TodoCard from './TodoCard';
import ErrorBoundary from './ErrorBoundary';

export default function TodoList(props) {
    const {
        todos,
        onEditTodo,
        onDeleteTodo,
        onToggleComplete,
        onPriorityChange,
        onDueDateChange
    } = props;

    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('dateAdded');

    const filteredTodos = todos.filter(todo => {
        if (filter === 'all') return true;
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return todo.category === filter;
    });

    const sortedTodos = [...filteredTodos].sort((a, b) => {
        if (sort === 'dateAdded') return new Date(a.dateAdded) - new Date(b.dateAdded);
        if (sort === 'priority') return b.priority.localeCompare(a.priority);
        if (sort === 'dueDate') return new Date(a.dueDate) - new Date(b.dueDate);
        return 0; // Default return value
    });

    const handleFilterChange = useCallback((e) => {
        setFilter(e.target.value);
    }, []);

    const handleSortChange = useCallback((e) => {
        setSort(e.target.value);
    }, []);

    return (
        <div className="todo-list">
            <div className="todo-controls">
                <select onChange={handleFilterChange} value={filter}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                </select>
                <select onChange={handleSortChange} value={sort}>
                    <option value="dateAdded">Date Added</option>
                    <option value="priority">Priority</option>
                    <option value="dueDate">Due Date</option>
                </select>
            </div>
            <ul>
                {sortedTodos.map((todo, index) => (
                    <ErrorBoundary key={index}>
                        <TodoCard
                            todo={todo}
                            onEdit={onEditTodo}
                            onDelete={onDeleteTodo}
                            onToggleComplete={onToggleComplete}
                            onPriorityChange={onPriorityChange}
                            onDueDateChange={onDueDateChange}
                        />
                    </ErrorBoundary>
                ))}
            </ul>
        </div>
    );
}