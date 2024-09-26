// import { useState, useEffect } from "react"
// import TodoInput from "./components/TodoInput"
// import TodoList from "./components/TodoList"
// import AISuggestions from "./components/AISuggestions";


// function App() {
//   const [todos, setTodos] = useState([])
//   const [todoValue, setTodoValue] = useState('')
//   const [aiSuggestion, setAiSuggestion] = useState('');


//   function persistData(newList) {
//     localStorage.setItem('todos', JSON.stringify({ todos: newList }))
//   }

//  /* function handleAddTodos(newTodo) {
//     const newTodoList = [...todos, newTodo]
//     persistData(newTodoList)
//     setTodos(newTodoList)
//     generateAISuggestion(newTodoList);

//   }*/
//     function handlePriorityChange(index, newPriority) {
//       const newTodoList = [...todos];
//       newTodoList[index].priority = newPriority;
//       persistData(newTodoList);
//       setTodos(newTodoList);
//       generateAISuggestion(newTodoList);

//     }

//   function handleAddTodos(newTodo) {
//     const newTodoItem = { text: newTodo, priority: 'medium' };
//     const newTodoList = [...todos, newTodoItem];
//     persistData(newTodoList);
//     setTodos(newTodoList);
//     generateAISuggestion(newTodoList);

//   }

//   function handleDeleteTodo(index) {
//     const newTodoList = todos.filter((todo, todoIndex) => {
//       return todoIndex !== index
//     })
//     persistData(newTodoList)
//     setTodos(newTodoList)
//     generateAISuggestion(newTodoList);

//   }

//   function handleEditTodo(index) {
//     const valueToBeEdited = todos[index]
//     setTodoValue(valueToBeEdited)
//     handleDeleteTodo(index)
//   }

//   function generateAISuggestion(todoList) {
//     // This is a mock AI suggestion. In a real application, you'd call an AI service here.
//     const incompleteTodos = todoList.filter(todo => !todo.completed);
//     if (incompleteTodos.length > 0) {
//       const randomTodo = incompleteTodos[Math.floor(Math.random() * incompleteTodos.length)];
//       setAiSuggestion(`AI suggests focusing on: "${randomTodo.text}"`);
//     } else {
//       setAiSuggestion("Great job! All tasks are complete.");
//     }
//   }


//   useEffect(() => {
//     if (!localStorage) {
//       return
//     }

//     let localTodos = localStorage.getItem('todos')
//     if (!localTodos) {
//       return
//     }

//     console.log(localTodos)
//     localTodos = JSON.parse(localTodos).todos
//     setTodos(localTodos)

//   }, [])

//   return (
//     <>
//       <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
//            <AISuggestions suggestion={aiSuggestion} />
//       <TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
//     </>
//   )
// }

// export default App
import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import AISuggestions from "./components/AISuggestions";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  const [todos, setTodos] = useState([
    { text: 'Task 1', completed: false },
    { text: 'Task 2', completed: false }
  ]);
  const [todoValue, setTodoValue] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify(newList));
  }

  function handlePriorityChange(index, newPriority) {
    const newTodoList = todos.map((todo, i) =>
      i === index ? { ...todo, priority: newPriority } : todo
    );
    persistData(newTodoList);
    setTodos(newTodoList);
    generateAISuggestion(newTodoList);
  }

  function handleAddTodos(newTodo) {
    const newTodoItem = { text: newTodo, priority: 'medium', completed: false };
    const newTodoList = [...todos, newTodoItem];
    persistData(newTodoList);
    setTodos(newTodoList);
    generateAISuggestion(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    persistData(newTodoList);
    setTodos(newTodoList);
    generateAISuggestion(newTodoList);
  }

  const handleEditTodo = (index, newText) => {
    setTodos(prevTodos => 
        prevTodos.map((todo, todoIndex) =>
            todoIndex === index ? { ...todo, text: newText } : todo
        )
    );
}

  function handleToggleComplete(index) {
    const newTodoList = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    persistData(newTodoList);
    setTodos(newTodoList);
    generateAISuggestion(newTodoList);
  }
  function generateAISuggestion(todoList) {
    if (!Array.isArray(todoList) || todoList.length === 0) {
      console.error('Invalid todo list');
      setAiSuggestion("No todos available.");
      return;
    }

    const incompleteTodos = todoList.filter(todo => !todo.completed);
    if (incompleteTodos.length > 0) {
      const randomTodo = incompleteTodos[Math.floor(Math.random() * incompleteTodos.length)];
      setAiSuggestion(`AI suggests focusing on: "${randomTodo.text}"`);
    } else {
      setAiSuggestion("Great job! All tasks are complete.");
    }
  }

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(localTodos);
    generateAISuggestion(localTodos);
  }, []);

  return (
    <ErrorBoundary>
      <TodoInput 
        todoValue={todoValue} 
        setTodoValue={setTodoValue} 
        handleAddTodos={handleAddTodos} 
      />
      
      <AISuggestions suggestion={aiSuggestion} todos={todos} />
      
      <TodoList 
        todos={todos}
        handleEditTodo={handleEditTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleToggleComplete={handleToggleComplete}
        handlePriorityChange={handlePriorityChange}
      />
          </ErrorBoundary>
  );
}

export default App;
