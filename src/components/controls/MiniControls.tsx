import './MiniControls.css'

import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

interface Props {
    media: string[],
    isVisible: boolean,
    isExpanded: boolean,
    setMediaIndex: Dispatch<SetStateAction<number>>,
    setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function MiniControls({ media, isVisible, isExpanded, setMediaIndex, setExpanded }: Props) {
    const controlsVisible = isVisible ? '' : 'hidden'
    const navigationVisible = media.length > 1
    const expandIcon = isExpanded ? 'fa-compress' : 'fa-expand'

    function nextMedia(event: SyntheticEvent) {
        event.stopPropagation()

        setMediaIndex(prev => (prev + 1) % media.length)
    }

    function prevMedia(event: SyntheticEvent) {
        event.stopPropagation()

        setMediaIndex(prev => (prev - 1 + media.length) % media.length)
    }

    function toggleExpanded(event: SyntheticEvent) {
        event.stopPropagation()

        setExpanded(prev => !prev)
    }

    function controlButton(onClick: (event: SyntheticEvent) => void, icon: string) {
        return (
            <a className='button' role='button' onClick={onClick}>
                <i className={`fa-solid ${icon}`}></i>
            </a>
        )
    }

    return (
        <div className={`mini-controls fade ${controlsVisible}`}>
            {navigationVisible && controlButton(prevMedia, 'fa-chevron-left')}

            {controlButton(toggleExpanded, expandIcon)}

            {navigationVisible && controlButton(nextMedia, 'fa-chevron-right')}
        </div>
    )
}
