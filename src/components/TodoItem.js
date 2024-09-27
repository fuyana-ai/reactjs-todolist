import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TodoItem({ todo, onEdit, onDelete, onToggleComplete, onPriorityChange, onDueDateChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSubmit = () => {
    onEdit(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.priority === 'high' ? 'high-priority' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={handleSubmit}
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
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
      <button onClick={() => onDelete(todo.id)} className="button-secondary">Delete</button>
    </li>
  );
}

export default TodoItem;