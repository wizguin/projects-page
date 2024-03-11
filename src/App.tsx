import './App.css'

import data from './data'
import Header from './components/Header'
import ProjectCard from './components/ProjectCard'


function App() {
    const projects = data.projects.map(project => (
        <ProjectCard
            title={project.title}
            description={project.description}
            badges={project.badges}
            demoUrl={project.demoUrl}
            sourceUrl={project.sourceUrl}
            previewFile={project.previewFile}
        />
    ))

    return (
        <>
            <Header headerTitle={data.headerTitle} />
            {projects}
        </>
    )
}

export default App
