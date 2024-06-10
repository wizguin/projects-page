import './Card.css'

import Preview from './preview/Preview'

export interface Props {
    title: string,
    description: string,
    badges?: string[],
    demoUrl?: string,
    sourceUrl?: string,
    media: string[]
}

export default function Card({ title, description, badges, demoUrl, sourceUrl, media }: Props) {
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
                    {demoUrl && <a className='button' href={demoUrl} target='_blank' role='button'>Demo</a>}
                    {sourceUrl && <a className='button button-secondary' href={sourceUrl} role='button'>Source Code</a>}
                </div>
            </div>

            {media.length > 0 && <Preview media={media} />}

        </div>
    )
}
