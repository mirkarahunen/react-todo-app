import React, { useContext } from 'react'
import './Tasks.scss'
import SingleTask from '../SingleTask/SingleTask'
import CreateTask from '../CreateTask/CreateTask'
import { TaskContext } from '../Context/TaskContext'
import { Droppable } from 'react-beautiful-dnd'

const Tasks = () => {
    const Tasks = useContext(TaskContext)

    return (
        <>
            <CreateTask />
            
            <section className="tasks">
                {Tasks.allTasks.map((task, i) => {
                    return ( 
                        <Droppable droppableId={`${i}`} key={i}>
                             
                            {(provided, snapshot) => (
                               <div className="droppable-container" 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    >
                                <SingleTask
                                    task={task.task}
                                    key={i}
                                    id={i}
                                    
                                />
                                {provided.placeholder}
                              </div> 
                            )}
                             
                        
                        </Droppable>
                    )
                })}
                
            </section>
            
        </>
    )
}

export default Tasks