import React, { useState, useContext, useEffect } from 'react'
import './CreateTask.scss'
import { TaskContext } from '../Context/TaskContext'


const CreateTask = () => {
    const Tasks = useContext(TaskContext)
    const [inputVal, setInputVal] = useState("")
    const [newTodo, setNewTodo] = useState({})

    const setTaskValue = (e) => {
        setInputVal(e.target.value);
    }

    const addNewTask = (event) => {
        event.preventDefault();
        Tasks.setAllTasks([...Tasks.allTasks, newTodo])
    }
   
    useEffect(() => {
        if(inputVal.length >0) {
            setNewTodo({task: inputVal[0].toUpperCase() + inputVal.slice(1), done: false})
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
