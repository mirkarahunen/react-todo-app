import React, { useContext } from 'react'
import './Tasks.scss'
import SingleTask from '../SingleTask/SingleTask'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskContext } from '../Context/TaskContext'
import { Droppable } from 'react-beautiful-dnd'
import { ThemeContext } from '../Context/ThemeContext'

const Tasks = () => {
    const Tasks = useContext(TaskContext)
    const Theme = useContext(ThemeContext)

    const onEnd = (result) => {
        if(!result.destination) return;

        let array = Array.from(Tasks.allTasks)
        const [removed] = array.splice(result.source.index, 1);
        array.splice(result.destination.index, 0, removed);
        localStorage.setItem("tasks", JSON.stringify(array))
        Tasks.setAllTasks(array)
    }


    if(Tasks.currentTab === "Completed") {
        if(Tasks.completedTasks.length > 0) {
            return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onEnd}>
                        <Droppable droppableId="doppable">
                            {(provided, snapshot) => (
                            <div className={`droppable-container ${Theme.theme}`} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} 
                                    style={ snapshot.isDraggingOver ? { background: "#ccc" } : null }    
                                >
                                    {Tasks.completedTasks.map((task,i) => (
                                        
                                        <SingleTask
                                                task={task.task}
                                                key={i}
                                                id={task.id}
                                                i={i}
                                                done={task.done}
                                            />
                                            ))
                                    }   
                                    {provided.placeholder}
                                </div> 
                            )}
                        </Droppable>
                    </DragDropContext>
                </section>
            )
    } else {
        return (
            <h2>Sorry, no tasks here</h2>
        )
    }
    } else if(Tasks.currentTab === "Active") {
        if(Tasks.activeTasks.length > 0) {
            return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onEnd}>
                        <Droppable droppableId="doppable">
                            {(provided, snapshot) => (
                            <div className={`droppable-container ${Theme.theme}`} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} 
                                    style={ snapshot.isDraggingOver ? { background: "#ccc" } : null }    
                                >
                                    {Tasks.activeTasks.map((task,i) => (
                                        
                                        <SingleTask
                                                task={task.task}
                                                key={i}
                                                id={task.id}
                                                i={i}
                                                done={task.done}
                                            />
                                            ))
                                    }   
                                    {provided.placeholder}
                                </div> 
                            )}
                        </Droppable>
                    </DragDropContext>
                </section>
            )
    } else {
        return (
            <h2>Sorry, no tasks here</h2>
        )
    }
} else {
        if(Tasks.allTasks.length > 0) {
            return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onEnd}>
                        <Droppable droppableId="doppable">
                            {(provided, snapshot) => (
                            <div className={`droppable-container ${Theme.theme}`} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} 
                                    style={ snapshot.isDraggingOver ? { background: "#ccc" } : null }    
                                >
                                    {Tasks.allTasks.map((task,i) => (
                                        
                                        <SingleTask
                                                task={task.task}
                                                key={i}
                                                id={task.id}
                                                i={i}
                                                done={task.done}
                                            />
                                            ))
                                    }   
                                    {provided.placeholder}
                                </div> 
                            )}
                        </Droppable>
                    </DragDropContext>
                </section>
            )  
        } else {
            return (
                <h2>Your Todo app is empty. Add a new todo in the field above</h2>
            )
        } 
    }
      
   /*  */
} 
   
    


export default Tasks

/*
                                {Tasks.allTasks.map((task, i) => {
                                    if(Tasks.currentTab === "Completed") {  
                                        
                                        return (
                                            task.done === true  && <SingleTask
                                            task={task.task}
                                            key={i}
                                            id={task.id}
                                            i={i}
                                            done={task.done}
                                            /> 
                                            
                                        )
                                        
                                    } else if (Tasks.currentTab === "Active") {
                                        return (
                                            task.done !== true && <SingleTask
                                            task={task.task}
                                            key={i}
                                            id={task.id}
                                            i={i}
                                            done={task.done}
                                            />
                                        )
                                        
                                    }  else {
                                        return ( 
                                            <SingleTask
                                                task={task.task}
                                                key={i}
                                                id={task.id}
                                                i={i}
                                                done={task.done}
                                            />
                                        )
                                    }
                            
                                })}*/ 