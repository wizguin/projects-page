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
    const navigationVisible = media.length > 1

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

    function onMouseEnter() {
        setIsMouseOver(true)
    }

    function onMouseLeave() {
        setIsMouseOver(false)
    }

    function nextMedia() {
        setMediaIndex(prev => (prev + 1) % media.length)
    }

    function prevMedia() {
        setMediaIndex(prev => (prev - 1 + media.length) % media.length)
    }

    function openGallery() {

    }

    function controlButton(onClick: () => void, icon: string) {
        return (
            <a className='button button-secondary' role='button' onClick={onClick}>
                <i className={`fa-solid ${icon}`}></i>
            </a>
        )
    }

    return (
        <div className='card-preview'
            role='button'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >

            <div className={`button-group fade ${controlsVisible}`}>
                {navigationVisible && controlButton(prevMedia, 'fa-chevron-left')}

                {controlButton(openGallery, 'fa-expand')}

                {navigationVisible && controlButton(nextMedia, 'fa-chevron-right')}
            </div>

            {preview}
        </div>
    )
}
