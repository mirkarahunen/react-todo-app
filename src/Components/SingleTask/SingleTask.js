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
    const [completeAnimation, showCompleteAnimation] = useState(false)
    const [removeCompleteAnimation, setRemoveCompleteAnimation] = useState(false)
    const [removeTaskAnimation, setRemoveTaskAnimation] = useState(false)

    
    const clickedTask = () => {
        const filteredTask = Tasks.allTasks.map(task => task.id === props.id ? {...task, done: !task.done } : task)

        if(!clicked) {
            setClicked(true)
            showCompleteAnimation(true)

            setTimeout(() => {
                showCompleteAnimation(false)
                Tasks.setAllTasks(filteredTask)
            }, 2000)
       
            
        } else {
            setClicked(false)
            setRemoveCompleteAnimation(true)

            setTimeout(() => {
                setRemoveCompleteAnimation(false)
                Tasks.setAllTasks(filteredTask)
           }, 2000)
            Tasks.setAllTasks(filteredTask)
        }

    }
    
    const removeTask = () => {
        const newArray = Tasks.allTasks.filter(task => task.task !== props.task)
        setRemoveTaskAnimation(true)

        setTimeout(() => {
            setRemoveTaskAnimation(false)
            Tasks.setAllTasks(newArray)
       }, 2000)
        
    }


    if(completeAnimation) {
        return (
            <div className={completeAnimation ? 'task task-update animation' : 'task task-update'} 
                key={props.i}>
                <div className={`container ${Theme.theme} single-task`}>
                    <h2>Your task has been marked done!</h2>
                </div>
            </div>     
        )
    } 
    else if(removeCompleteAnimation) {
        return (
            <div className={removeCompleteAnimation ? 'task task-update animation' : 'task task-update'} 
                key={props.i}>
                <div className={`container ${Theme.theme} single-task`}>
                    <h2>Your task has been marked undone!</h2>
                </div>
            </div>     
        )
    }
    else if(removeTaskAnimation) {
        return (
            <div className={removeTaskAnimation ? 'task task-update animation' : 'task task-update'} 
                key={props.i}>
                <div className={`container ${Theme.theme} single-task`}>
                    <h2>Your task has been removed!</h2>
                </div>
            </div>     
        )
    }
     else {
        return ( 
            <Draggable draggableId={`${props.id}`} key={props.id} index={props.i} className={`${Theme.theme} `} >
                {(provided, snapshot) => (
                    <div 
                        className={`wrapper task ${Theme.theme} `}
                        key={props.i} 
                        ref={provided.innerRef} 
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                    <div className="container single-task" onClick={clickedTask}>
                        <input type="checkbox" name="checkmark" hidden/>
                        <label htmlFor="checkmark" className={props.done ? `checkmark done ${Theme.theme}` : `checkmark ${Theme.theme}`} key={props.i}></label>
                        <p className={ props.done ? "done" : ""} >{props.task}</p>
                    </div>

                    <picture onClick={removeTask}  className='remove'>
                        <source />
                        <img src={remove} alt="remove"/>
                    </picture>
                </div>
                )}
            </Draggable>    
        )
    }
}
export default SingleTask