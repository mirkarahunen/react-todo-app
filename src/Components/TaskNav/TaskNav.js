import React, { useState, useEffect, useContext } from 'react'
import { TaskContext } from '../Context/TaskContext'
import './TaskNav.scss'
import { ThemeContext } from '../Context/ThemeContext'

const TaskNav = () => {
    const Tasks = useContext(TaskContext)
    const Theme = useContext(ThemeContext)
    const [fullwidth, setFullwidth] = useState(true)
    const [active, setActive] = useState(true)
    const [removeAllCompleteAnimation, setRemoveAllCompleteAnimation] = useState(false)

    useEffect(() => {

        if(window.matchMedia('(min-width: 640px)').matches) {
            setFullwidth(false)
        } else {
            setFullwidth(true)
        }
        
    }, [])

    useEffect(() => {
        
        if(Tasks.currentTab === "All") {
            setActive(true)
        }

        else if(Tasks.currentTab === "Active") {
            setActive(true)
        }

        else if(Tasks.currentTab === "Completed") {
            setActive(true)
        }

        if(!Tasks.currentTab && active) {
            setActive(false)
        }

    }, [Tasks.currentTab, active])


    const removeCompleted = () => {
        const newTasks = Tasks.allTasks.filter(item => item.done !== true)
        setRemoveAllCompleteAnimation(true)

        setTimeout(() => {
            setRemoveAllCompleteAnimation(false)
            Tasks.setAllTasks(newTasks)
       }, 2000)
        
    }

    if(removeAllCompleteAnimation) {
        return (
            <section>
                <div className='wrapper task'>
                    <div className={removeAllCompleteAnimation ? 'task task-update animation' : 'task task-update'} >
                        <div className={`container ${Theme.theme} single-task`}>
                            <h2>All complete tasks have been removed!</h2>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section>
            <div className="wrapper task-nav">    
                <div className='button-wrapper'>
                    <div className={`container ${Theme.theme} items`}>
                        <button type='button' name="items">
                            {Tasks.allTasks.length} Items left
                        </button>
                    </div>
                    <div className={fullwidth ? `container ${Theme.theme} filter fullwidth` : `container ${Theme.theme} filter`}>
                        <button type='button' onClick={(e) => Tasks.setCurrentTab(e.target.name)} name='All' className={Tasks.currentTab === "All" && active ? 'btn active' : 'btn'}>
                            All
                        </button>        
                        <button type='button' onClick={(e) => Tasks.setCurrentTab(e.target.name)} name='Active' className={Tasks.currentTab === "Active" && active ? 'btn active' : 'btn'}>
                            Active
                        </button>        
                        <button type='button' onClick={(e) => Tasks.setCurrentTab(e.target.name)} name='Completed' className={Tasks.currentTab === "Completed" && active ? 'btn active' : 'btn'}>
                            Completed
                        </button>        
                    </div>
                    <div className={`container ${Theme.theme} clear`}>
                        <button type='button' name='clear' onClick={removeCompleted}>
                            Clear Completed
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TaskNav