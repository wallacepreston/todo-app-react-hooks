import React, {useState} from 'react';
import './App.css';

const Form = ({todos, setTodos}) => {
  const [todoId, setTodoId] = useState(1)
  const [newTodo, setNewTodo] = useState('')
  const newId = () => {
    setTodoId(todoId + 1);
    return todoId;
  }
  const handleChange = ev => {
    ev.preventDefault();
    setNewTodo(ev.target.value)
  }
  const handleSubmit = ev => {
    ev.preventDefault();
    if(!newTodo) alert('Cannot add empty todo!');
    setTodos([
      ...todos,
      {task: newTodo, isComplete: false, id: newId()}
    ]);
    setNewTodo('');
  }
  return (
    <form onSubmit={handleSubmit}  className='big-list-item'>
      <input type='text' placeholder='New Todo' onChange={handleChange} value={newTodo}/>
      <button type='submit'>Add</button>
    </form>
  )
}

const List = ({todos, setShowStatus, showStatus, toggleComplete}) => (
  <div className='big-list-item'>
    <h3>Todos</h3>
    <button onClick={() => setShowStatus('incomplete')}>Incomplete</button>
        <button onClick={() => setShowStatus('complete')}>Completed</button>
        <button onClick={() => setShowStatus('all')}>All</button>
        {todos.map((todo, idx) => {
          if(todo.isComplete && showStatus === 'incomplete') {return ''}
          else if(!todo.isComplete && showStatus === 'complete') {return ''}
          return (
          <div key={idx} style={{
            textDecoration: (todo.isComplete ? 'line-through' : '')
          }} onClick={() => toggleComplete(todo)}>
            {todo.task}
          </div>
        )})}
  </div>
)

function App() {
  const [showStatus, setShowStatus] = useState('all')
  const [todos, setTodos] = useState([{task: 'Walk Dog', isComplete: false, id: 0}]);
  const toggleComplete = task => {
    const newTodos = todos.map(todo => {
      if (todo.id === task.id) todo.isComplete = !todo.isComplete; 
      return todo;
    })
    setTodos(newTodos)
  }
  
  
  return (
    <main className="App">
      <h1>
        To Do
      </h1>
      <List todos={todos} setShowStatus={setShowStatus} showStatus={showStatus} toggleComplete={toggleComplete} />
      <Form todos={todos} setTodos={setTodos} />
      
    </main>
  );
}

export default App;
