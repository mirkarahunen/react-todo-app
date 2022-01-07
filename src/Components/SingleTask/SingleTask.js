import React, { useState, useContext } from 'react'
import './SingleTask.scss'
import remove from '../../images/icon-cross.svg'
import { TaskContext } from '../Context/TaskContext'
import { Draggable } from 'react-beautiful-dnd'


const SingleTask = (props) => {
    const [clicked, setClicked] = useState(false)
    const Tasks = useContext(TaskContext)


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
        <Draggable draggableId={`${props.id}`} key={props.id} index={props.id}>
            {(provided, snapshot) => (
                <div 
                    className='single-task-container' 
                    key={props.i} 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                <div className="single-task" onClick={clickedTask}>
                    <input type="checkbox" name="checkmark" hidden/>
                    <label htmlFor="checkmark" className={!clicked ? "checkmark" : "checkmark clicked"} key={props.i}></label>
                    <p className={!clicked ? "" : "clicked"}>{props.task}</p>
                </div>
                
                <img src={remove} alt="remove" className='cross' onClick={removeTask}/>
            </div>
            )}
             
        </Draggable>    
    )
}

export default SingleTask