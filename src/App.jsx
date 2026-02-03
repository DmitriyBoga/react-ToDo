import { useState, useEffect, useMemo, useCallback } from 'react'
import Header from './components/Header'
import Main from './components/Main'

function App() {
  const [todo, setTodo] = useState(() => {
      const saved = localStorage.getItem('todos')
      try {
          return saved ? JSON.parse(saved) : []
      } catch (e) {
          console.error('Ошибка парсинга todos из localStorage', e)
          return []
          }
      })
  const [filter, setFilter] = useState("all")
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todo))
  }, [todo])
  const addTodo = useCallback((title) =>{
        if (!title.trim()) return;
        const newTodo = {
            id: Date.now(),
            title,
            completed: false
        }
        setTodo(prev => [...prev, newTodo])
        
  }, [])
  const handleDel = useCallback((id) =>{
        setTodo(prev => prev.filter(item => item.id !==id ))
  }, [])
  const toggleTodo = useCallback((id) =>{
        setTodo(prev => prev.map(item=> item.id === id ? {...item, completed: !item.completed}: item))
  }, [])
  const completed = useMemo(() => {
    return todo.filter(item => item.completed).length
  }, [todo])
  const filterTodo = useMemo(() => {
    return todo.filter(item => {
            if (filter ==="completed") return item.completed
            if (filter ==="active") return !item.completed
            return true
        })
  }, [todo, filter])
  return (
    <div className='app-container'>
      <Header/>
      <Main
        todo={filterTodo}
        addTodo={addTodo}
        handleDel={handleDel}
        toggleTodo={toggleTodo}
        filter={filter}
        setFilter={setFilter}
        completed={completed}
        filterTodo={filterTodo}
      />
    </div>
  ) 
}

export default App
