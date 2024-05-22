import './ProjectPreview.css'

import MiniControls from './controls/MiniControls'
import ThumbnailControls from './controls/ThumbnailControls'

import Image from './media/Image'
import Video from './media/Video'

import { PreviewTypes, getType } from './types/PreviewTypes'

import { useState, useEffect } from 'react'

interface Props {
    media: string[]
}

export default function ProjectPreview({ media }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isExpanded, setExpanded] = useState(false)
    const [mediaIndex, setMediaIndex] = useState(0)

    const fileName = media[mediaIndex]

    const type = getType(fileName)
    const src = `assets/previews/${fileName}`

    let preview

    switch (type) {
        case PreviewTypes.Image:
            preview = <Image src={src} />
            break

        case PreviewTypes.Video:
            preview = <Video src={src} isExpanded={isExpanded} />
            break
    }

    const miniControls = <MiniControls
        media={media}
        isVisible={isMouseOver || isExpanded}
        isExpanded={isExpanded}
        setMediaIndex={setMediaIndex}
        setExpanded={setExpanded}
    />

    const thumbnailControls = <ThumbnailControls
        media={media}
        mediaIndex={mediaIndex}
        setMediaIndex={setMediaIndex}
    />

    const background = <div className='expanded-bg' onClick={() => setExpanded(false)}></div>

    useEffect(() => {
        if (!isExpanded) {
            setIsMouseOver(false)
        }
    }, [isExpanded])

    // Keyboard shortcuts
    useEffect(() => {
        if (!isExpanded) {
            return
        }

        function onKeyDown(event: KeyboardEvent) {
            switch (event.key) {
                case 'Escape':
                    setExpanded(false)
                    break
            }
        }

        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }

    }, [isExpanded])

    function onMouseEnter() {
        setIsMouseOver(true)
    }

    function onMouseLeave() {
        setIsMouseOver(false)
    }

    return (
        <div className='card-preview'>

            <span
                className={`card-media ${isExpanded ? 'expanded fade-in' : ''}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseEnter}
            >
                {isExpanded && background}
                {preview}
                {isExpanded && thumbnailControls}
                {miniControls}
            </span>

        </div>
    )
}
