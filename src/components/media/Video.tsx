import './Video.css'

import { useState, useEffect, useRef, MouseEvent } from 'react'

interface Props {
    src: string,
    isMouseOver: boolean,
    isExpanded: boolean
}

export default function Video({ src, isMouseOver, isExpanded }: Props) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const seekbarRef = useRef<HTMLDivElement | null>(null)

    const playIcon = isPlaying ? 'fa-pause' : 'fa-play'
    const hidePlayButton = isPlaying && !isMouseOver ? 'hidden' : ''

    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        function updateProgress() {
            if (videoRef.current) {
                setProgress(videoRef.current.currentTime / videoRef.current.duration)
            }
        }

        const interval = setInterval(updateProgress, 20)

        return () => {
            clearInterval(interval)
        }
    }, [])

    function togglePlayback(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        setIsPlaying(prev => !prev)
    }

    function onSeekbarClick(event: MouseEvent) {
        event.stopPropagation()

        if (!seekbarRef.current) return

        const rect = seekbarRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const percent = x / rect.width

        if (videoRef.current) {
            videoRef.current.currentTime = videoRef.current.duration * percent
        }
    }

    const seekbar = <div
        ref={seekbarRef}
        className='seekbar-container'
        role='button'
        onClick={onSeekbarClick}
    >
        <div className='seekbar' style={{ width: `${progress * 100}%` }}></div>
    </div>

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

            {isExpanded && seekbar}
        </span>
    )
}
