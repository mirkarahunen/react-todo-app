import React, { useState, useContext } from 'react'
import './SingleTask.scss'
import remove from '../../images/icon-cross.svg'
import { TaskContext } from '../Context/TaskContext'
import { useDrag } from 'react-dnd'

const SingleTask = (props) => {
    const [clicked, setClicked] = useState(false)
    const Tasks = useContext(TaskContext)
    const [{isDragging}, drag] = useDrag(() => ({
        type: "div",
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))

    const clickedTask = () => {
        if(!clicked) {
            setClicked(true)
        } else {
            setClicked(false)
        }
    }

    const removeTask = () => {
        const newArray = Tasks.allTasks.filter(task => task.task !== props.task)
        Tasks.setAllTasks(newArray)
    }

    return ( 
        <div className='single-task-container' key={props.i} ref={drag} style={{backgroundColor: isDragging ? "pink" : "white"}}>
            <div className="single-task" onClick={clickedTask}>
                <input type="checkbox" name="checkmark" hidden/>
                <label htmlFor="checkmark" className={!clicked ? "checkmark" : "checkmark clicked"} key={props.i}></label>
                <p className={!clicked ? "" : "clicked"}>{props.task}</p>
            </div>
            
            <img src={remove} alt="remove" className='cross' onClick={removeTask}/>
        </div> 
            
    )
}

export default SingleTask