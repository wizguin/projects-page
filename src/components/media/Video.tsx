import './Video.css'

import Seekbar from './Seekbar'

import { useState, useEffect, useRef, MouseEvent } from 'react'

interface Props {
    src: string,
    showSeekbar: boolean
}

export default function Video({ src, showSeekbar }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const videoRef = useRef<HTMLVideoElement | null>(null)

    const playIcon = isPlaying ? 'fa-pause' : 'fa-play'
    const hidePlayButton = isPlaying && !isMouseOver ? 'hidden' : ''

    const seekbar = <Seekbar
        videoRef={videoRef}
        visible={isMouseOver}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
    />

    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }
    }, [isPlaying])

    function togglePlayback(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        setIsPlaying(prev => !prev)
    }

    return (
        <span className='video-container'>
            <i className={`play-button fa-solid fade ${playIcon} ${hidePlayButton}`}></i>

            <video
                ref={videoRef}
                role='button'
                onClick={togglePlayback}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
            >
                <source src={src} />
            </video>

            {showSeekbar && seekbar}
        </span>
    )
}
