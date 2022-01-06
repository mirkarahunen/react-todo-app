import React, { useContext } from 'react'
import './Tasks.scss'
import SingleTask from '../SingleTask/SingleTask'
import CreateTask from '../CreateTask/CreateTask'
import { TaskContext } from '../Context/TaskContext'

const Tasks = () => {
    const Tasks = useContext(TaskContext)
    
    return (
        <>
            <CreateTask />
            
            <section className="tasks">
                {Tasks.allTasks.map((task, i) => {
                    return ( 
                        <SingleTask 
                            task={task.task}
                            key={i}
                            id={i}/>
                    )
                })}
            </section>
        </>
    )
}

export default Tasks