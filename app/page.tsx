'use client'

import { useEffect, useState } from "react"
import { useFetch } from "./hooks/useFetch";
import Card from "./components/Card"

type Todo = {
  id: string;
  item: string;
  isDone: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ fetch ] = useFetch()

  const fetchTodos = async () => {
    const response = await fetch('/api/todos')
    if(!response.status) {
      setError(response.message)
      return
    }
    const loadedTodos = []
    const todoItems = response.data
    for(const key in todoItems){
      loadedTodos.push({
        id: key,
        item: todoItems[key].item,
        isDone: todoItems[key].isDone
      })
    }
    setTodos(loadedTodos)
    setIsLoading(false)
  }

  const createTodo = async (event: React.FormEvent) => {
    event.preventDefault()
    if(newTodo.trim().length === 0) return
    const body = { item: newTodo, isDone: false }
    const response = await fetch('/api/todos', 'POST', body)
    setNewTodo('')
    if(!response.status) {
      setError(response.message)
      return
    }
    fetchTodos();
  };

const makeTodoComplete = async (id: string, complete: boolean) => {
  const body = { isDone: complete }
  const response = await fetch(`/api/todos/${id}`, 'PATCH', body)
  if(!response.status) {
    setError(response.message)
    return
  }
  fetchTodos() 
};

useEffect(() => {
  fetchTodos()
},[])

  const displayTodos = todos.map(
    todo => <Card 
      onClick={makeTodoComplete} 
      id={todo.id} 
      complete={todo.isDone} 
      key={todo.id}>
        {todo.item}
    </Card>
  )

  const loadingStatement = isLoading && <section className="text-center"><p>Loading...</p></section>
  const emptyTodo = !isLoading && todos.length < 1 && <section className="text-center"><p>No todos to display.</p></section>

  if(error) {
    return <section><p>{error}</p></section>
  }


  return (
    <>
      <div className="fixed w-screen h-32 bg-gradient-to-b from-base-100 to-transparent  z-10"></div>
      <main className='max-w-md m-4'>
        <div className='fixed z-10'>
          <form className='flex justify-between gap-1 w-80 md:w-96 absolute z-20' onSubmit={createTodo}>
            <input
              type='text'
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              placeholder='Type here'
              className='input input-bordered input-secondary w-full max-w-xs'
            />
            <button className='btn w-14 btn-outline bg-base-100 btn-secondary'>Add</button>
          </form>
        </div>
        <div className='mt-24 w-80 md:w-96 overflow-y-auto'>
          {displayTodos}
          {loadingStatement}
          {emptyTodo}
        </div>
      </main>
    </>
  );
  
}
