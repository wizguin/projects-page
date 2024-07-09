import './App.css'
import './Variables.css'

import data from './data'
import Header from './components/header/Header'
import Notifications from './components/notifications/Notifications'
import Section from './components/section/Section'

function App() {
    const sections = data.sections.map((section, index) => (
        <Section key={index} {...section} />
    ))

    return (
        <>
            <Notifications />
            <Header />
            {sections}
        </>
    )
}

export default App
