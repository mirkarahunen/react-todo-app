import React, { useState, useContext, useEffect } from 'react'
import './SingleTask.scss'
import remove from '../../images/icon-cross.svg'
import { TaskContext } from '../Context/TaskContext'
import { Draggable } from 'react-beautiful-dnd'


const SingleTask = (props) => {
    const [clicked, setClicked] = useState(false)
    const Tasks = useContext(TaskContext)
    

    const clickedTask = () => {
        const filteredTask = Tasks.allTasks.map(task => task.id === props.id ? {...task, done: !task.done } : task)
        //Tasks.setFilteredTasks(filteredTask)

        if(!clicked) {
            setClicked(true)
            Tasks.setAllTasks(filteredTask)
        } else {
            setClicked(false)
            Tasks.setAllTasks(filteredTask)
        }

    }
    
    const removeTask = () => {
        const newArray = Tasks.allTasks.filter(task => task.task !== props.task)
        Tasks.setAllTasks(newArray)
    }

    useEffect(() => {

    }, [clicked, Tasks.allTasks])


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
                <div className="container single-task" >
                    <input type="checkbox" name="checkmark" hidden/>
                    <label htmlFor="checkmark" className={!clicked ? "checkmark" : "checkmark done"} key={props.i}></label>
                    <p className={!clicked ? "" : "done"} >{props.task}</p>
                </div>
                
                <img src={remove} alt="remove" className='cross' onClick={removeTask}/>
            </div>
            
            )}
             
        </Draggable>    
    )
}

export default SingleTask