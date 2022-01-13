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
            id: (Date.now() + Math.random()),
            task: "Complete online Javascript course",
            done: false
        },
        {
            id: Date.now() + Math.random(),
            task: "Jog around the park",
            done: false
        },
        {
            id: Date.now() + Math.random(),
            task: "10 minutes meditation",
            done: false
        },
        {
            id: Date.now() + Math.random(),
            task: "Read for one hour",
            done: false
        },
        {
            id: Date.now() + Math.random(),
            task: "Pick up groceries",
            done: false
        }, 
        {
            id: Date.now() + Math.random(),
            task: "Complete ToDo App on Frontend Mentor",
            done: false
        }
    ]
    
    const [allTasks, setAllTasks] = useState(() => {
        return savedTasks ? JSON.parse(savedTasks) : dummyTasks
    })

    const [filteredTasks, setFilteredTasks] = useState([])
    const [currentTab, setCurrentTab] = useState('Active')
    const [completedTasks, setCompletedTasks] = useState([])
    const [activeTasks, setActiveTasks] = useState([])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(allTasks))

        const getItems = () => {
            const complete = allTasks.filter(task => task.done === true)
            console.log(complete);
            setCompletedTasks(complete)

            const active = allTasks.filter(task => task.done !== true)
            console.log(active);
            setActiveTasks(active)
        }

        getItems()
  
    }, [allTasks, savedTasks, filteredTasks])

    //console.log(savedTasks);


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
