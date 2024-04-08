import './ProjectPreview.css'

import Image from './media/Image'
import Video from './media/Video'
import { PreviewTypes, getType } from './types/PreviewTypes'

import { useState } from 'react'

export interface Props {
    media: string[]
}

export default function ProjectPreview({ media }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [mediaIndex, setMediaIndex] = useState(0)

    const controlsVisible = !isMouseOver ? 'hidden' : ''

    const fileName = media[mediaIndex]
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

    function onMouseEnter() {
        setIsMouseOver(true)
    }

    function onMouseLeave() {
        setIsMouseOver(false)
    }

    return (
        <div className='card-preview'
            role='button'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >

            <div className={`button-group fade ${controlsVisible}`}>
                <a className='button button-secondary' role='button'>
                    <i className='fa-solid fa-chevron-left'></i>
                </a>

                <a className='button button-secondary' role='button'>
                    <i className='fa-solid fa-expand'></i>
                </a>

                <a className='button button-secondary' role='button'>
                    <i className='fa-solid fa-chevron-right'></i>
                </a>
            </div>

            {preview}
        </div>
    )
}
