import './App.css'

import data from './data'
import Header from './components/Header'
import ProjectCard from './components/ProjectCard'


function App() {
    const projects = data.projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
    ))

    return (
        <>
            <Header headerTitle={data.headerTitle} />
            {projects}
        </>
    )
}

export default App
