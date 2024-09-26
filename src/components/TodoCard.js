// 

// import React from 'react'

// console.log('TodoCard component loaded');

// export default function TodoCard(props) {
//     console.log('Props received:', props);
//     const {
//         todo,
//         index,
//         handlePriorityChange,
//         handleEditTodo,
//         handleDeleteTodo,
//         handleToggleComplete
//     } = props

//     return (
//         <li className='todoItem'>
//             <div className="todoContent">
//                 <p>{todo.text}</p>
//                 <input 
//                     type="checkbox" 
//                     checked={todo.completed} 
//                     onChange={() => handleToggleComplete(index)}
//                 />
//             </div>
//             <div className='actionsContainer'>
//                 <select onChange={(e) => handlePriorityChange(index, e.target.value)}>
//                     <option value='low'>Low</option>
//                     <option value='medium'>Medium</option>
//                     <option value='high'>High</option>
//                 </select>
//                 <button onClick={() => handleEditTodo(index)}>
//                     <i className="fa-solid fa-pen-to-square"></i>
//                 </button>
//                 <button onClick={() => handleDeleteTodo(index)}>
//                     <i className="fa-regular fa-trash-can"></i>
//                 </button>
//             </div>
//         </li>
//     )
// }


import React, { useState } from 'react';

export default function TodoCard(props) {
    const {
        todo,
        index,
        handlePriorityChange,
        handleEditTodo,
        handleDeleteTodo,
        handleToggleComplete
    } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleSaveEdit = () => {
        if (editText.trim()) { // Ensure not saving empty text
            handleEditTodo(index, editText); // Call to update the todo
            setIsEditing(false); // Exit edit mode
        } else {
            alert('Todo cannot be empty!'); // Alert for empty text
        }
    };

    return (
        <li className='todoItem'>
            <div className="todoContent">
                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                ) : (
                    <p>{todo.text}</p>
                )}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(index)}
                />
            </div>
            <div className='actionsContainer'>
                <select onChange={(e) => handlePriorityChange(index, e.target.value)}>
                    <option value='low'>Low</option>
                    <option value='medium'>Medium</option>
                    <option value='high'>High</option>
                </select>
                
                {isEditing ? (
                    <button onClick={handleSaveEdit}>
                        Save
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                )}

                <button onClick={() => handleDeleteTodo(index)}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </li>
    );
}
