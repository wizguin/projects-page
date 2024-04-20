import './Video.css'

import Seekbar from './Seekbar'

import { useState, useEffect, useRef, MouseEvent } from 'react'

interface Props {
    src: string,
    isExpanded: boolean
}

export default function Video({ src, isExpanded }: Props) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const containerRef = useRef<HTMLElement | null>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const timeoutRef = useRef<number | null>(null)

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
    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', onFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange)
        }
    }, [])

    function onClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        setIsPlaying(prev => !prev)
    }

    function onDoubleClick() {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            containerRef.current?.requestFullscreen()
        }
    }

    function mouseOver() {
        setIsMouseOver(true)

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            setIsMouseOver(false)
        }, 3000)
    }

    function mouseOut() {
        setIsMouseOver(false)
    }

    return (
        <span
            ref={containerRef}
            className='video-container'
            onMouseEnter={mouseOver}
            onMouseLeave={mouseOut}
            onMouseMove={mouseOver}
            onMouseDown={mouseOver}
            onMouseUp={mouseOver}
        >
            <i className={`play-button fa-solid fade ${playIcon} ${hidePlayButton}`}></i>

            <video
                ref={videoRef}
                role='button'
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
            >
                <source src={src} />
            </video>

            {(isExpanded || isFullscreen) && seekbar}
        </span>
    )
}
