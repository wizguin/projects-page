import './MiniControls.css'

import { classNames } from '../../../../../utils/Utils'

import { Dispatch, SetStateAction, MouseEvent } from 'react'

interface Props {
    media: string[],
    isVisible: boolean,
    isExpanded: boolean,
    setMediaIndex: Dispatch<SetStateAction<number>>,
    setExpanded: Dispatch<SetStateAction<boolean>>
}

export default function MiniControls({ media, isVisible, isExpanded, setMediaIndex, setExpanded }: Props) {
    const navigationVisible = media.length > 1
    const expandIcon = isExpanded ? 'fa-compress' : 'fa-expand'

    function nextMedia(event: MouseEvent) {
        event.stopPropagation()

        setMediaIndex(prev => (prev + 1) % media.length)
    }

    function prevMedia(event: MouseEvent) {
        event.stopPropagation()

        setMediaIndex(prev => (prev - 1 + media.length) % media.length)
    }

    function toggleExpanded(event: MouseEvent) {
        event.stopPropagation()

        setExpanded(prev => !prev)
    }

    function controlButton(onClick: (event: MouseEvent) => void, icon: string) {
        return (
            <a className='button' role='button' onClick={onClick}>
                <i className={`fa-solid ${icon}`}></i>
            </a>
        )
    }

    return (
        <div className={classNames('mini-controls fade', !isVisible && 'hidden')}>
            {navigationVisible && controlButton(prevMedia, 'fa-chevron-left')}

            {controlButton(toggleExpanded, expandIcon)}

            {navigationVisible && controlButton(nextMedia, 'fa-chevron-right')}
        </div>
    )
}
