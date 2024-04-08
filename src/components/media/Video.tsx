import './Video.css'

import { useState, useEffect, useRef, MutableRefObject, SyntheticEvent } from 'react'

interface Props {
    src: string,
    isMouseOver: boolean
}

export default function Video({ src, isMouseOver }: Props) {
    const [isPlaying, setIsPlaying] = useState(false)

    const ref: MutableRefObject<HTMLVideoElement | null> = useRef(null)

    const playIcon = isPlaying ? 'fa-pause' : 'fa-play'
    const hidePlayButton = isPlaying && !isMouseOver ? 'hidden' : ''

    useEffect(() => {
        if (isPlaying) {
            ref.current?.play()
        } else {
            ref.current?.pause()
        }
    }, [isPlaying])

    function togglePlayback(event: SyntheticEvent) {
        event.preventDefault()
        setIsPlaying(prev => !prev)
    }

    return (
        <>
            <i
                className={`play-button fa-solid ${playIcon} ${hidePlayButton}`}
            ></i>

            <video
                ref={ref}
                role='button'
                onClick={togglePlayback}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
            >
                <source src={src} />
            </video>
        </>
    )
}
