import React, { useContext } from 'react';
import './App.scss';
import '../src/scss/main.scss'

import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/base/_typography.scss'
import './scss/base/normalize.css'


import CreateTask from './Components/CreateTask/CreateTask';
import Header from './Components/Header/Header';
import Tasks from './Components/Tasks/Tasks';
import TaskNav from './Components/TaskNav/TaskNav';

import TaskProvider from './Components/Context/TaskContext';
import { TaskContext } from './Components/Context/TaskContext';

const App = () => {
    const TasksContext = useContext(TaskContext)
    
    return (
        <TaskProvider>
            
                <div className="App">
                    <Header />
                    <CreateTask />
                    <Tasks />
                    <TaskNav items={TasksContext.allTasks}/>
                </div>
            
        </TaskProvider>        
    );
}

export default App;
