import React, { useState, useEffect, useContext } from 'react'
import { TaskContext } from '../Context/TaskContext'
import './TaskNav.scss'
import { ThemeContext } from '../Context/ThemeContext'

const TaskNav = (props) => {
    const Tasks = useContext(TaskContext)
    const Theme = useContext(ThemeContext)
    const [fullwidth, setFullwidth] = useState(true)
    const [fullContainer, setFullContainer] = useState(true)
    const [active, setActive] = useState(true)

    useEffect(() => {

        if(window.matchMedia('(min-width: 640px)').matches) {
            setFullwidth(false)
            setFullContainer(false)
        } else {
            setFullwidth(true)
            setFullContainer(true)
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
        const newTasks = props.items.filter(item => item.done !== true)
        Tasks.setAllTasks(newTasks)
    }

  

    return (
        <section>
            <div className={fullContainer ? `wrapper task-nav ${Theme.theme} wide` : `wrapper ${Theme.theme} task-nav`}>
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