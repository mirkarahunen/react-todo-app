import './App.scss';
import '../src/scss/main.scss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";

import './scss/base/_fonts.scss'
import './scss/base/_globals.scss'
import './scss/base/_typography.scss'
import './scss/base/normalize.css'

import Header from './Components/Header/Header';
import Tasks from './Components/Tasks/Tasks';
import TaskProvider from './Components/Context/TaskContext';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
        <div className="App">
            <Header />
            <TaskProvider>
                <Tasks />
            </TaskProvider>
        </div>
    </DndProvider>
  );
}

export default App;
