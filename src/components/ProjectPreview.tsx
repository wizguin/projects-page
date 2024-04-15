import './ProjectPreview.css'

import MiniControls from './controls/MiniControls'
import ThumbnailControls from './controls/ThumbnailControls'
import Image from './media/Image'
import Video from './media/Video'
import { PreviewTypes, getType } from './types/PreviewTypes'

import { useState } from 'react'

interface Props {
    media: string[]
}

export default function ProjectPreview({ media }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isExpanded, setExpanded] = useState(false)
    const [mediaIndex, setMediaIndex] = useState(0)

    const fileName = media[mediaIndex]

    if (!fileName) {
        return
    }

    const type = getType(fileName)
    const src = `assets/previews/${fileName}`

    let preview

    switch (type) {
        case PreviewTypes.Image:
            preview = <Image src={src} />
            break

        case PreviewTypes.Video:
            preview = <Video src={src} isMouseOver={isMouseOver} />
            break
    }

    const miniControls = <MiniControls
        media={media}
        isMouseOver={isMouseOver || isExpanded}
        setMediaIndex={setMediaIndex}
        setExpanded={setExpanded}
    />

    const thumbnailControls = <ThumbnailControls
        media={media}
        mediaIndex={mediaIndex}
        setMediaIndex={setMediaIndex}
    />

    function onMouseEnter() {
        setIsMouseOver(true)
    }

    function onMouseLeave() {
        setIsMouseOver(false)
    }

    function onClick() {
        if (isExpanded) {
            setExpanded(false)
        }
    }

    return (
        <div className='card-preview'>

            <span
                className={`card-media ${isExpanded ? 'expanded' : ''}`}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                {preview}
                {isExpanded && thumbnailControls}
                {miniControls}
            </span>

        </div>
    )
}
