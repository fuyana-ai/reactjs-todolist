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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TodoCard(props) {
    const {
        todo,
        onEdit,
        onDelete,
        onToggleComplete,
        onPriorityChange,
        onDueDateChange
    } = props;

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleSaveEdit = () => {
        if (editedText.trim()) {
            onEdit(todo.id, editedText); // Save edited task
            setIsEditing(false); // Exit editing mode
        } else {
            alert('Todo cannot be empty!');
        }
    };

    const handleCancelEdit = () => {
        setEditedText(todo.text); // Reset text to original if canceled
        setIsEditing(false); // Exit editing mode
    };

    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.priority === 'high' ? 'high-priority' : ''}`}>
            <div className='todo-content'>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(todo.id)}
                />
                {isEditing ? (
                    <div className="edit-mode">
                        <input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            autoFocus
                        />
                        <button onClick={handleSaveEdit}>
                            <i className="fa-regular fa-floppy-disk"></i> {/* Save icon */}
                        </button>
                        <button onClick={handleCancelEdit}>
                            <i className="fa-solid fa-xmark"></i> {/* Cancel icon */}
                        </button>
                    </div>
                ) : (
                    <span onClick={() => setIsEditing(true)}>{todo.text}</span>
                )}
            </div>

            {!isEditing && (
                <>
                    <select
                        value={todo.priority}
                        onChange={(e) => onPriorityChange(todo.id, e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <DatePicker
                        selected={todo.dueDate}
                        onChange={(date) => onDueDateChange(todo.id, date)}
                        placeholderText="Set due date"
                    />
                    <div className='action-buttons'>
                        <button onClick={() => setIsEditing(true)}>
                            <i className="fa-solid fa-pen-to-square"></i> {/* Edit icon */}
                        </button>
                        <button onClick={() => onDelete(todo.id)}>
                            <i className="fa-regular fa-trash-can"></i> {/* Delete icon */}
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}
