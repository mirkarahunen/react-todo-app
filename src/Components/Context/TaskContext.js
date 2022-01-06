import { createContext, useState, useEffect } from 'react'

export const TaskContext = createContext({
    allTasks: [],
    setAllTasks: () => {}
})

const TaskProvider = (props) => {
    const savedTasks = localStorage.getItem("tasks")
    const dummyTasks = [
        {
            task: "Complete online Javascript course",
            done: false
        },
        {
            task: "Jog around the park",
            done: false
        },
        {
            task: "10 minutes meditation",
            done: false
        },
        {
            task: "Read for one hour",
            done: false
        },
        {
            task: "Pick up groceries",
            done: false
        }, 
        {
            task: "Complete ToDo App on Frontend Mentor",
            done: false
        }
    ]
    
    const [allTasks, setAllTasks] = useState(() => {
        return savedTasks ? JSON.parse(savedTasks) : dummyTasks
    })
    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(allTasks))
    }, [allTasks, savedTasks])

    return (
        <TaskContext.Provider
            value={{
                allTasks,
                setAllTasks
            }}>
                {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider
