'use client'

import { useCallback, useEffect, useState } from "react"
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

  const createTodo = useCallback(async (event: React.FormEvent) =>{
    console.log('createTodo triggered')
    event.preventDefault()
    if(newTodo.trim().length === 0) return

    await fetch('https://todo-ton-default-rtdb.firebaseio.com/todos.json', {
      method: 'POST',
      body: JSON.stringify({ item: newTodo, isDone: false })
    });
    
    setNewTodo('')
  }, [newTodo])

  useEffect(() => {
    console.log('useEffect triggered')
    const fetchTodos = async () => {
      const response = await fetch('https://todo-ton-default-rtdb.firebaseio.com/todos.json')
      if(!response.ok) {
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json()

      const loadedTodos = []
      
      for(const key in responseData){
        loadedTodos.push({
          id: key,
          item: responseData[key].item,
          isDone: responseData[key].isDone
        })
      }
      setTodos(loadedTodos)
      setIsLoading(false)
    }

    fetchTodos().catch(err => {
      setIsLoading(false)
      setError(err.message)
    })
  },[createTodo])


  const makeTodoComplete = (id: string) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, isDone: true };
        }
        return todo;
      });
    });
  };

  console.log(todos)

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
        </div>
      </main>
    </>
  );
  
}
