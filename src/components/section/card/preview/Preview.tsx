import './Preview.css'

import { classNames } from '../../../../utils/Utils'
import Image from './image/Image'
import MiniControls from './controls/MiniControls'
import { PreviewTypes, getType } from './types/PreviewTypes'
import ThumbnailControls from './controls/ThumbnailControls'
import Video from './video/Video'

import { isMobile } from 'react-device-detect'
import { useState, useEffect } from 'react'

interface Props {
    media: string[]
}

export default function Preview({ media }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isExpanded, setExpanded] = useState(false)
    const [mediaIndex, setMediaIndex] = useState(0)

    const fileName = media[mediaIndex]

    const type = getType(fileName)
    const src = `/previews/${fileName}`

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
        isVisible={isMobile || isMouseOver || isExpanded}
        isExpanded={isExpanded}
        setMediaIndex={setMediaIndex}
        setExpanded={setExpanded}
    />

    const thumbnailControls = <ThumbnailControls
        media={media}
        mediaIndex={mediaIndex}
        setMediaIndex={setMediaIndex}
    />

    const background = <div className='lightbox' onClick={() => setExpanded(false)}></div>

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
            event.preventDefault()

            switch (event.key) {
                case 'Escape':
                    setExpanded(false)
                    break

                case 'ArrowLeft':
                    setMediaIndex(prev => (prev - 1 + media.length) % media.length)
                    break

                case 'ArrowRight':
                    setMediaIndex(prev => (prev + 1) % media.length)
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
                className={classNames('card-media', isExpanded && 'expanded fade-in')}
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
