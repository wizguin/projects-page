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
        <span key={text} className='badge text-bg-secondary me-1'>{text}</span>
    ))

    return (
        <section className='container px-4 pb-4'>
            <div className='card'>
                <div className='row g-0'>

                    <div className='col-md-8'>
                        <div className='card-body m-4'>
                            <h5 className='card-title'>{title}</h5>

                            <div className='my-2'>{badgeElements}</div>

                            <p className='card-text'>{description}</p>

                            {demoUrl && <a className='btn btn-primary me-2' href={demoUrl} role='button'>Demo</a>}
                            {sourceUrl && <a className='btn btn-secondary' href={sourceUrl} role='button'>Source Code</a>}
                        </div>
                    </div>

                    <ProjectPreview previewType={previewType} previewFile={previewFile} />
                </div>
            </div>
        </section>
    )
}
