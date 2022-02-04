import React, { useContext } from 'react';
import './App.scss';

import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/base/_typography.scss'
import './scss/base/normalize.css'

import CreateTask from './Components/CreateTask/CreateTask';
import Header from './Components/Header/Header';
import Tasks from './Components/Tasks/Tasks';
import TaskNav from './Components/TaskNav/TaskNav';

import TaskProvider from './Components/Context/TaskContext';
import { ThemeContext } from './Components/Context/ThemeContext';
import Footer from './Components/Footer/Footer';

const App = () => {
    const Theme = useContext(ThemeContext)

    return (
        
        <TaskProvider>
            
                <div className={`App ${Theme.theme}`}>
                    <Header />
                    <CreateTask />
                    <Tasks />
                    <TaskNav />
                    <Footer />
                </div>
                
        </TaskProvider>   
          
    );
}

export default App;
