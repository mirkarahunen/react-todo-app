import React, { useState, useEffect, useContext } from 'react'
import { TaskContext } from '../Context/TaskContext'
import './TaskNav.scss'

const TaskNav = (props) => {
    const Tasks = useContext(TaskContext)
    const [fullwidth, setFullwidth] = useState(true)
    const [fullContainer, setFullContainer] = useState(true)
    //console.log(window.matchMedia('(min-width: 640px)'));
    const [active, setActive] = useState(true)
    const [currentTab, setCurrentTab] = useState('Active')
    const activeItems = props.items.filter(item => item.done !== true)
    const completedItems = props.items.filter(item => item.done === true)

    useEffect(() => {

        if(window.innerWidth >= 640) {
            setFullwidth(false)
            setFullContainer(false)
        } else {
            setFullwidth(true)
            setFullContainer(true)
        }
    }, [])

    const clickedActive = (e) => {
        setCurrentTab(e.target.name)

        if(currentTab === "All") {
            setActive(true)
            Tasks.setFilteredTasks([])
        }

        else if(currentTab === "Active") {
            setActive(true)
            Tasks.setFilteredTasks(activeItems)
        }

        else if(currentTab === "Completed") {
            setActive(true)
            Tasks.setFilteredTasks(completedItems)
        }

        if(!currentTab && active) {
            setActive(false)
        }
    }

    const removeCompleted = () => {
        const newTasks = props.items.filter(item => item.done !== true)
        Tasks.setAllTasks(newTasks)
    }

    
  

    return (
        <section>
            <div className={fullContainer ? `wrapper task-nav wide` : `wrapper task-nav`}>
                <div className='container items'>
                    <button type='button' name="items">
                        {props.items.length} Items left
                    </button>
                </div>
                <div className={fullwidth ? `container filter fullwidth` : `container filter`}>
                    <button type='button' onClick={clickedActive} name='All' className={currentTab === "All" && active ? 'btn active' : 'btn'}>
                        All
                    </button>        
                    <button type='button' onClick={clickedActive} name='Active' className={currentTab === "Active" && active ? 'btn active' : 'btn'}>
                        Active
                    </button>        
                    <button type='button' onClick={clickedActive} name='Completed' className={currentTab === "Completed" && active ? 'btn active' : 'btn'}>
                        Completed
                    </button>        
                </div>
                <div className='container clear'>
                    <button type='button' name='clear' onClick={removeCompleted}>
                        Clear Completed
                    </button>
                </div>
            </div>
        </section>
    )
}

export default TaskNav