import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider,useTodo,TodoContext } from './context'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';


function App() {
  const [todos, setTodos] = useState([]);  

  const addTodo = (todo)=>{
      {/* state cahnge hogi aur humein set karni hai toh settodo use karo , 
        oldTodos ki arrays jo hai, unko leke ek new array banao jismein,
        ek object aayega, jiski id hogi, baaki ki todo waali properties hongi, 
        jo hai todomessage, iscompleted, aur uske baad baaki ki saari todos hongi
       */}
      setTodos((oldTodos)=>[{id: Date.now(),...todo},...oldTodos])
  }
  const updatedTodo =(id,todo)=>{
      {/* prev array (current) mein jaao, loop karo map k through, 
      element ki id match karo agar hogyi toh update nahi hui toh as it is */}

      setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id === id ? todo : prevTodo))
  }
  const deleteTodo =(id)=>{
    {/* 
      prev array mein jaao, aur filter method use karo, 
      agar prevtodo ki id !=(not equal) hai given id se
      toh unko rhnedo, agar equal hogi toh FILTEROUT ho jayegi
       */}
    setTodos((prev)=>{return prev.filter((prevTodo)=> prevTodo.id !== id)})
  }
  const toggleComplete=(id)=>{
    {/* 
      1. prev todos waale array mein jao map k through, 
      2. check karo ki prevtodo id k equal hai ki nahi? 
        --> agar hai 
          i) toh us object mein puraani values, of prevtodo spread karo 
          ii) aur nayi value of iscompleted ko toggle karo (opposite !) overwrite karo 
        --> agar nahi hai toh same rhnedo    
          i) no changes 
          
       */}
    setTodos((prev)=>prev.map(
      (prevTodo)=> 
        prevTodo.id===id? 
      {...prevTodo,isCompleted: !prevTodo.isCompleted} : prevTodo))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
        setTodos(todos)
    }
  }, [])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  
  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleComplete}}>
        <div className="bg-[#172842] min-h-72 py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo)=>(
                          <div key={todo.id}
                          className='w-full' >
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
