import React, { useContext } from 'react'
import './Tasks.scss'
import SingleTask from '../SingleTask/SingleTask'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskContext } from '../Context/TaskContext'
import { Droppable } from 'react-beautiful-dnd'

const Tasks = () => {
    const Tasks = useContext(TaskContext)
    

    const onEnd = (result) => {
        if(!result.destination) return;

        let array = Array.from(Tasks.allTasks)
        const [removed] = array.splice(result.source.index, 1);
        array.splice(result.destination.index, 0, removed);
        localStorage.setItem("tasks", JSON.stringify(array))
        Tasks.setAllTasks(array)
    }
      
    if(Tasks.filteredTasks.length > 0) {
        return (
            <section className="tasks">
                <DragDropContext onDragEnd={onEnd}>
                            <Droppable droppableId="doppable">
                                {(provided, snapshot) => (
                                   <div className="droppable-container" 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps} 
                                        style={ snapshot.isDraggingOver ? { background: "#ccc" } : null }    
                                    >
                                        {Tasks.filteredTasks.map((task, i) => {
                                            return ( 
                                                <SingleTask
                                                    task={task.task}
                                                    key={i}
                                                    id={task.id}
                                                    i={i}
                                                />
                                            )
                                        })}
                                    {provided.placeholder}
                                  </div> 
                                )}
                            </Droppable>
                    </DragDropContext>
            </section>
        )
    }
    else {
        return (
                <section className="tasks">
                    <DragDropContext onDragEnd={onEnd}>
                            <Droppable droppableId="doppable">
                                {(provided, snapshot) => (
                                   <div className="droppable-container" 
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        style={{ background:  snapshot.isDraggingOver ? "#ccc" : "white" }} 
                                    >
                                        {Tasks.allTasks.map((task, i) => {
                                            return ( 
                                                <SingleTask
                                                    task={task.task}
                                                    key={i}
                                                    id={task.id}
                                                    i={i}
                                                />
                                            )
                                        })}
                                    {provided.placeholder}
                                  </div> 
                                )}
                            </Droppable>
                    </DragDropContext>
                </section>
        )
    }
    
}

export default Tasks