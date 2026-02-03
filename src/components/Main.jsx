import React, { useState, useEffect } from 'react'

const Main = ({todo, addTodo, handleDel, toggleTodo, filter, setFilter, completed, filterTodo}) => { 
    const [value, setValue] = useState("") 
    const handleAdd = () => {
    addTodo(value)
    setValue('')
    }
    return (
        <div className='todo-app'>
            <h2>Todo List</h2>
            <div className='todo-input'>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Введите задачу'
                />
                <button onClick={handleAdd}>Добавить</button>
            </div>
            
            <div className="filters">
                <button className={filter === "all" ? "filter-btn active" : "filter-btn"} 
                    onClick={() => setFilter("all")}>
                    Всего задач: {todo.length}
                </button>
                <button className={filter === "completed" ? "filter-btn active" : "filter-btn"} 
                    onClick={() => setFilter("completed")}>
                    Сделано: {completed}
                </button>
                <button className={filter === "active" ? "filter-btn active" : "filter-btn"}
                    onClick={() => setFilter("active")}>
                    Осталось: {todo.length - completed}
                </button>
            </div>
            <ul className='todo-list'>
                {filterTodo.map((item, index)=>(
                    <li onClick={() => toggleTodo(item.id)}  
                    key={item.id}
                    className={item.completed ? "todo completed" : "todo"}>
                        <span>{index+1} {item.title}</span>
                    <button className='delete-btn' onClick={(e)=>{e.stopPropagation(); handleDel(item.id)}}>✕</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Main
