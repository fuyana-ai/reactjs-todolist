
// export default function TodoInput(props) {
//     const { handleAddTodos, todoValue, setTodoValue } = props
//     return (
//         <header>
//             <input value={todoValue} onChange={(e) => {
//                 setTodoValue(e.target.value)
//             }} placeholder="Enter todo..." />
//             <button onClick={() => {
//                 handleAddTodos(todoValue)
//                 setTodoValue('')
//             }}>Add</button>
//         </header>
//     )
// }

import React, { useState, useCallback, useEffect } from 'react';

export default function TodoInput({ onAddTodo, todoToEdit, onSaveEdit, clearEdit }) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('personal'); // Default category
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Set initial state for editing if a todo is being edited
    useEffect(() => {
        if (todoToEdit) {
            setText(todoToEdit.text);
            setCategory(todoToEdit.category || 'personal'); // Set category if provided
        } else {
            setText('');
            setCategory('personal'); // Reset on clear edit
        }
    }, [todoToEdit]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (text.trim()) {
            setIsLoading(true);
            setError('');
            try {
                if (todoToEdit) {
                    // If editing, call the save edit function
                    await onSaveEdit({ ...todoToEdit, text, category });
                } else {
                    // If adding, call the add todo function
                    await onAddTodo({ text, category });
                }
                setText(''); // Clear input after adding or saving
                clearEdit(); // Clear the edit state
            } catch (err) {
                setError('Failed to save todo. Please try again.'); // Handle errors
            } finally {
                setIsLoading(false); // Reset loading state
            }
        } else {
            setError('Please enter a todo item'); // Handle empty input case
        }
    }, [onAddTodo, onSaveEdit, text, category, todoToEdit, clearEdit]);

    const handleChange = useCallback((e) => {
        setText(e.target.value); // Update text input
    }, []);

    return (
        <form onSubmit={handleSubmit} className="todo-input">
            <div className="form-group">
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    placeholder="Add a new todo"
                    required
                />
                {error && <span className="error-message">{error}</span>} {/* Display error */}
            </div>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)} // Update category
            >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="shopping">Shopping</option>
                <option value="other">Other</option>
            </select>
            <button type="submit" className="button-primary" disabled={isLoading}>
                {isLoading ? 'Saving...' : todoToEdit ? 'Save Todo' : 'Add Todo'} {/* Button text changes based on action */}
            </button>
        </form>
    );
}

