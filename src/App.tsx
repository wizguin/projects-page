import './App.css'

import Header from './components/Header'
import ProjectCard from './components/ProjectCard'

function App() {
    return (
        <>
            <Header headerTitle='Portfolio'/>

            <ProjectCard
                title='Project'
                description='
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                '
                badges={ ['Node.js', 'React'] }
                demoUrl='demo'
                sourceUrl='source'
                previewFile='preview.jpg'
            />
        </>
    )
}

export default App
