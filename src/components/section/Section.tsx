import './Section.css'

import ProjectCard from './card/ProjectCard'

import { Props as Project } from './card/ProjectCard'

export interface Props {
    title: string,
    projects: Project[]
}

export default function Section({ title, projects }: Props) {
    const projectComponents = projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
    ))

    return (
        <section className='cards'>
            <h2>{title}</h2>
            {projectComponents}
        </section>
    )
}
