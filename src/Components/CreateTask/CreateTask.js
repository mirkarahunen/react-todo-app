import React, { useState, useContext, useEffect } from 'react'
import './CreateTask.scss'
import { TaskContext } from '../Context/TaskContext'
import { ThemeContext } from '../Context/ThemeContext'

const CreateTask = () => {
    const Tasks = useContext(TaskContext)
    const Theme = useContext(ThemeContext)
    const [inputVal, setInputVal] = useState("")
    const [newTodo, setNewTodo] = useState({})

    const setTaskValue = (e) => {
        if(e.target.value.length === 0) {
            setInputVal("")
        } else {
            setInputVal(e.target.value[0].toUpperCase() + e.target.value.slice(1));
        }
    }

    const addNewTask = (event) => {
        event.preventDefault();
        const highestID = Math.max(...Tasks.allTasks.map(item => item.id))
      
        newTodo.id = highestID + 1 
        Tasks.setAllTasks([...Tasks.allTasks, newTodo])
        setInputVal("")
    }


    useEffect(() => {
        
        if(inputVal.length > 0) {
            setNewTodo({id: 0, task: inputVal, done: false})
        } else {
            return
        }
        
    }, [inputVal])

    
    return (
        <section className={`create-task`}>
            <form onSubmit={addNewTask}>
                <input className={`create ${Theme.theme}`} type="text" onChange={setTaskValue} value={inputVal} placeholder="Create a new todo..."/>
            </form>
        </section>
    )
}

export default CreateTask
