import { useContext } from 'react';
import './App.scss';
import '../src/scss/main.scss'

import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/base/_typography.scss'
import './scss/base/normalize.css'

import { DragDropContext } from 'react-beautiful-dnd'

import Header from './Components/Header/Header';
import Tasks from './Components/Tasks/Tasks';
import {TaskContext} from './Components/Context/TaskContext';
import TaskProvider from './Components/Context/TaskContext';


const App = () => {
    const TasksPro = useContext(TaskContext)

    const reorder = (startIndex, endIndex) => {
        const array = TasksPro.allTasks
        const [removed] = TasksPro.allTasks.splice(startIndex, 1)
        TasksPro.allTasks.splice(endIndex, 0, removed)

        return array
    }
 
    const onEnd = (result) => {
        TasksPro.setAllTasks(reorder(result.source.index, result.destination.index))
        localStorage.setItem("tasks", JSON.stringify(TasksPro.allTasks))
    }


    return (
        <TaskProvider>
            <DragDropContext onDragEnd={onEnd}>
                <div className="App">
                    <Header />
                    <Tasks />
                </div>
            </DragDropContext>
        </TaskProvider>        
    );
}

export default App;
