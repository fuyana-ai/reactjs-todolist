import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Task 1', priority: 'medium', completed: false, dueDate: null, dateAdded: new Date() },
        { id: 2, text: 'Task 2', priority: 'low', completed: false, dueDate: null, dateAdded: new Date() }
    ]);
    const [nextId, setNextId] = useState(3); // For unique IDs
    const [todoToEdit, setTodoToEdit] = useState(null); // State for the todo being edited

    const persistData = (newList) => {
        localStorage.setItem('todos', JSON.stringify(newList));
    };

    const handleAddTodo = ({ text, category }) => {
        const newTodo = { id: nextId, text, priority: 'medium', completed: false, dueDate: null, dateAdded: new Date() };
        const newTodoList = [...todos, newTodo];
        setNextId(nextId + 1); // Increment ID for next todo
        persistData(newTodoList);
        setTodos(newTodoList);
    };

    const handleEditTodo = (id, newText) => {
        const newTodoList = todos.map(todo => 
            todo.id === id ? { ...todo, text: newText } : todo
        );
        persistData(newTodoList);
        setTodos(newTodoList);
        setTodoToEdit(null); // Clear edit state after saving
    };

    const handleDeleteTodo = (id) => {
        const newTodoList = todos.filter(todo => todo.id !== id);
        persistData(newTodoList);
        setTodos(newTodoList);
        setTodoToEdit(null); // Clear edit state if deleted
    };

    const handleToggleComplete = (id) => {
        const newTodoList = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        persistData(newTodoList);
        setTodos(newTodoList);
    };

    const handlePriorityChange = (id, newPriority) => {
        const newTodoList = todos.map(todo => 
            todo.id === id ? { ...todo, priority: newPriority } : todo
        );
        persistData(newTodoList);
        setTodos(newTodoList);
    };

    const handleDueDateChange = (id, newDueDate) => {
        const newTodoList = todos.map(todo => 
            todo.id === id ? { ...todo, dueDate: newDueDate } : todo
        );
        persistData(newTodoList);
        setTodos(newTodoList);
    };

    const handleStartEdit = (todo) => {
        setTodoToEdit(todo); // Set the todo to be edited
    };

    useEffect(() => {
        const localTodos = JSON.parse(localStorage.getItem('todos') || '[]');
        if (localTodos.length > 0) {
            setTodos(localTodos);
            setNextId(localTodos.length + 1); // Ensure unique IDs
        }
    }, []);

    return (
        <ErrorBoundary>
            <TodoInput 
                onAddTodo={handleAddTodo} 
                todoToEdit={todoToEdit} 
                onSaveEdit={handleEditTodo} 
                clearEdit={() => setTodoToEdit(null)} 
            />
            <TodoList 
                todos={todos}
                onEditTodo={handleStartEdit} // Pass the edit handler
                onDeleteTodo={handleDeleteTodo}
                onToggleComplete={handleToggleComplete}
                onPriorityChange={handlePriorityChange}
                onDueDateChange={handleDueDateChange}
            />
        </ErrorBoundary>
    );
}

export default App;
