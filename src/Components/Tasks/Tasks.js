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

    const onCompletedEnd = (result) => {
        if(!result.destination) return;
        let array = Array.from(Tasks.allTasks.filter(item => item.done === true))
        //console.log(array);
        const [removed] = array.splice(result.source.index, 1);
        array.splice(result.destination.index, 0, removed);
        Tasks.setCompletedTasks(array)
    }

    const onActivedEnd = (result) => {
        if(!result.destination) return;
        let array = Array.from(Tasks.allTasks.filter(item => item.done !== true))
        //console.log(array);
        const [removed] = array.splice(result.source.index, 1);
        array.splice(result.destination.index, 0, removed);
        Tasks.setActiveTasks(array)
    }


    if(Tasks.currentTab === "Completed") {
        if(Tasks.completedTasks.length > 0) {
            return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onCompletedEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                            <div className={`droppable-container ${Theme.theme}`} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} 
                                    style={ snapshot.isDraggingOver ? { background: "#ddd" } : null }    
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
            <section className='tasks'>
                <div className={`droppable-container ${Theme.theme}`} >
                    <h2>Sorry, no tasks here</h2>
                </div>
            </section>
        )
    }
    } else if(Tasks.currentTab === "Active") {
        if(Tasks.activeTasks.length > 0) {
            return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onActivedEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                            <div className={`droppable-container ${Theme.theme}`} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} 
                                    style={ snapshot.isDraggingOver ? { background: "#ddd" } : null }    
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
            <section className='tasks'>
                <div className={`droppable-container ${Theme.theme}`} >
                    <h2>Sorry, no tasks here</h2>
                </div>
            </section>
        )
    }
} else {
        if(Tasks.allTasks.length > 0) {
            return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                            <div className={`droppable-container ${Theme.theme}`} 
                                    ref={provided.innerRef}
                                    {...provided.droppableProps} 
                                    style={ snapshot.isDraggingOver ? { background: "#ddd" } : null }    
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
                <section className='tasks'>
                <div className={`droppable-container ${Theme.theme}`} >
                    <h2>Your Todo app is empty. Add a new todo in the field above.</h2>
                </div>
            </section>
            )
        } 
    }
} 
   
export default Tasks
