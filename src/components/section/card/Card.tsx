import './Card.css'

import { classNames } from '../../../utils/Utils'
import DropdownButton from './button/DropdownButton'
import { Props as DropdownButtonProps } from './button/DropdownButton'
import Preview from './preview/Preview'

export interface Props {
    title: string,
    description: string,
    badges?: string[],
    demoUrl?: string,
    sourceUrl?: string | DropdownButtonProps['options'],
    media: string[]
}

export default function Card({ title, description, badges, demoUrl, sourceUrl, media }: Props) {
    const badgeElements = badges && badges.map(text => (
        <span key={text} className='badge'>{text}</span>
    ))

    const demoText = 'Demo'
    const sourceText = 'Source Code'

    const sourceButton = Array.isArray(sourceUrl)
        // Dropdown
        ? <DropdownButton label={sourceText} options={sourceUrl} />
        // Default button
        : button(sourceText, sourceUrl || '', 'button-secondary')

    function button(label: string, href: string, ...classes: string[]) {
        return (
            <a
                className={classNames('button', ...classes)}
                href={href}
                target='_blank'
                role='button'
            >
                {label}
            </a>
        )
    }

    return (
        <div className='card'>

            <div className='card-body'>
                <h3 className='card-title'>{title}</h3>

                <div className='card-badges'>{badgeElements}</div>

                <p className='card-text'>{description}</p>

                <div className='card-buttons'>
                    {demoUrl && button(demoText, demoUrl)}
                    {sourceUrl && sourceButton}
                </div>
            </div>

            {media.length > 0 && <Preview media={media} />}

        </div>
    )
}
