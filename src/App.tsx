import './App.css'

import data from './data'
import Header from './components/Header'
import Section from './components/Section'

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
