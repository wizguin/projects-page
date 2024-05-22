import './App.css'

import data from './data'
import Header from './components/header/Header'
import Section from './components/section/Section'

function App() {
    const sections = data.sections.map((section, index) => (
        <Section key={index} {...section} />
    ))

    return (
        <>
            <Header headerTitle={data.headerTitle} />
            {sections}
        </>
    )
}

export default App
