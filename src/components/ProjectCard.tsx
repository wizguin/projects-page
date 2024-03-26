import './ProjectCard.css'

import ProjectPreview from './ProjectPreview'
import PreviewTypes from './types/PreviewTypes'

export interface Props {
    title: string,
    description: string,
    badges?: string[],
    demoUrl?: string,
    sourceUrl?: string,
    previewType: PreviewTypes
    previewFile: string
}

export default function ProjectCard({ title, description, badges, demoUrl, sourceUrl, previewType, previewFile }: Props) {
    const badgeElements = badges && badges.map(text => (
        <span key={text} className='badge'>{text}</span>
    ))

    return (
        <div className='card'>

            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>

                <div className='card-badges'>{badgeElements}</div>

                <p className='card-text'>{description}</p>

                <div className='card-buttons'>
                    {demoUrl && <a className='button' href={demoUrl} role='button'>Demo</a>}
                    {sourceUrl && <a className='button button-secondary' href={sourceUrl} role='button'>Source Code</a>}
                </div>
            </div>

            <ProjectPreview previewType={previewType} previewFile={previewFile} />

        </div>
    )
}
