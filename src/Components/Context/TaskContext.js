import { createContext, useState, useEffect } from 'react'

export const TaskContext = createContext({
    allTasks: [],
    setAllTasks: () => {},
    filteredTasks: [],
    setFilteredTasks: () => {}
})

const TaskProvider = (props) => {
    const savedTasks = localStorage.getItem("tasks")
    const dummyTasks = [
        {
            id: 1,
            task: "Complete online Javascript course",
            done: false
        },
        {
            id: 2,
            task: "Jog around the park",
            done: false
        },
        {
            id: 3,
            task: "10 minutes meditation",
            done: false
        },
        {
            id: 4,
            task: "Read for one hour",
            done: false
        },
        {
            id: 5,
            task: "Pick up groceries",
            done: false
        }, 
        {
            id: 6,
            task: "Complete ToDo App on Frontend Mentor",
            done: false
        }
    ]
    
    const [allTasks, setAllTasks] = useState(() => {
        return savedTasks ? JSON.parse(savedTasks) : dummyTasks
    })

    const [filteredTasks, setFilteredTasks] = useState([])
    const [currentTab, setCurrentTab] = useState('All')
    const [completedTasks, setCompletedTasks] = useState([])
    const [activeTasks, setActiveTasks] = useState([])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(allTasks))
        
        const getItems = () => {
            const complete = allTasks.filter(task => task.done === true)
            setCompletedTasks(complete)

            const active = allTasks.filter(task => task.done !== true)
            setActiveTasks(active)
        }

        getItems()
  
    }, [allTasks, savedTasks, filteredTasks])

    


    return (
        <TaskContext.Provider
            value={{
                allTasks,
                setAllTasks,
                filteredTasks,
                setFilteredTasks,
                currentTab,
                setCurrentTab,
                completedTasks,
                setCompletedTasks,
                activeTasks,
                setActiveTasks
            }}>
                {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider
