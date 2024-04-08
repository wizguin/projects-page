import './ProjectPreview.css'

import Image from './media/Image'
import Video from './media/Video'
import PreviewTypes from './types/PreviewTypes'

import { useState } from 'react'

export interface Props {
    previewType: PreviewTypes
    previewFile: string
}

export default function ProjectPreview({ previewType, previewFile }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)

    const controlsVisible = !isMouseOver ? 'hidden' : ''
    const src = `assets/previews/${previewFile}`

    let preview

    switch (previewType) {
        case PreviewTypes.Image:
            preview = <Image src={src} />
            break

        case PreviewTypes.Video:
            preview = <Video src={src} />
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
