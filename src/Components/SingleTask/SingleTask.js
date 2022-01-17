import React, { useState, useContext } from 'react'
import './SingleTask.scss'
import remove from '../../images/icon-cross.svg'
import { TaskContext } from '../Context/TaskContext'
import { Draggable } from 'react-beautiful-dnd'
import '../SingleTask/TaskUpdate.scss'
import { ThemeContext } from '../Context/ThemeContext'

const SingleTask = (props) => {
    const [clicked, setClicked] = useState(false)
    const Tasks = useContext(TaskContext)
    const Theme = useContext(ThemeContext)
    const [animation, showAnimation] = useState(false)

    
    
    const clickedTask = () => {
        const filteredTask = Tasks.allTasks.map(task => task.id === props.id ? {...task, done: !task.done } : task)
        //Tasks.setFilteredTasks(filteredTask)

        if(!clicked) {
            setClicked(true)
            setTimeout(() => {
                showAnimation(true)

            setTimeout(() => {
                showAnimation(false)
                Tasks.setAllTasks(filteredTask)
            }, 2000)
        }, 1500)
            
        } else {
            setClicked(false)
            showAnimation(true)

            setTimeout(() => {
                showAnimation(false)
                Tasks.setAllTasks(filteredTask)
           }, 2000)
            Tasks.setAllTasks(filteredTask)
        }

    }
    
    const removeTask = () => {
        const newArray = Tasks.allTasks.filter(task => task.task !== props.task)
        Tasks.setAllTasks(newArray)
    }

   


 if(animation) {
    return (
            <div className={animation ? 'task task-update animation' : 'task task-update'} 
                onClick={clickedTask}
                key={props.i}>
                <div className={`container ${Theme.theme} single-task`}>
                    <h2>Your task has been moved!</h2>
                </div>
            </div>
            
            
    )
 } else {
    return ( 
        <Draggable draggableId={`${props.id}`} key={props.i} index={props.i} >
            {(provided, snapshot) => (
                <div 
                    className='wrapper task' 
                    onClick={clickedTask}
                    key={props.i} 
                    ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    >
                <div className={`container ${Theme.theme} single-task`}>
                    <input type="checkbox" name="checkmark" hidden/>
                    <label htmlFor="checkmark" className={props.done ? `checkmark done ${Theme.theme}` : `checkmark ${Theme.theme}`} key={props.i}></label>
                    <p className={ props.done ? "done" : ""} >{props.task}</p>
                    <img src={remove} alt="remove" className='cross' onClick={removeTask}/>
                </div>
                
            </div>
            
            )}
             
        </Draggable>    
    )
}
}
export default SingleTask