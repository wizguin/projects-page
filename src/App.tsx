import './App.css'

import data from './data'
import Header from './components/Header'
import ProjectCard from './components/ProjectCard'


function App() {
    return (
        <>
            <Header headerTitle={data.headerTitle}/>
        </>
    )
}

export default App
