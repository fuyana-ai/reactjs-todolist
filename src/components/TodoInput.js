
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

import React, { useState } from 'react';

export default function TodoInput({ handleAddTodos, todoValue, setTodoValue }) {
    const [inputValue, setInputValue] = useState(todoValue || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            handleAddTodos(inputValue);
            setInputValue('');
        }
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setTodoValue(e.target.value);
    };

    return (
        <header>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter todo..."
                    autoFocus
                />
                <button type="submit">Add</button>
            </form>
        </header>
    );
}
