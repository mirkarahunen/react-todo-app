import React, { useState, useContext, useEffect, useCallback } from 'react'
import './CreateTask.scss'
import { TaskContext } from '../Context/TaskContext'

const CreateTask = () => {
    const Tasks = useContext(TaskContext)
    const [inputVal, setInputVal] = useState("")
    const [newTodo, setNewTodo] = useState({})

    const setTaskValue = (e) => {
        setInputVal(e.target.value[0].toUpperCase() + e.target.value.slice(1));
    }

    const addNewTask = useCallback((event) => {
        event.preventDefault();
        
        newTodo.id = Date.now() + Math.random()
        Tasks.setAllTasks([...Tasks.allTasks, newTodo])
    }, [newTodo, Tasks])


    useEffect(() => {
        
        if(inputVal.length > 0) {
            setNewTodo({id: 0, task: inputVal, done: false})
        } else {
            return
        }
        
    }, [inputVal])

    
    return (
        <section className="create-task">
            <form onSubmit={addNewTask}>
                <input className="create" type="text" onChange={setTaskValue} value={inputVal} placeholder="Create a new todo..."/>
            </form>
        </section>
    )
}

export default CreateTask
