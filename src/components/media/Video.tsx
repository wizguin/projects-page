import './Video.css'

import VideoControls from './VideoControls'

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

    const controls = <VideoControls
        videoRef={videoRef}
        isExpanded={isExpanded}
        isMouseOver={isMouseOver}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isFullscreen={isFullscreen}
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

    useEffect(() => {
        if (!containerRef.current) {
            return
        }

        if (isMouseOver) {
            containerRef.current.style.cursor = 'default'
        } else {
            containerRef.current.style.cursor = 'none'
        }
    }, [isMouseOver])

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
            <video
                ref={videoRef}
                onClick={onClick}
                onDoubleClick={onDoubleClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
            >
                <source src={src} />
            </video>

            {controls}
        </span>
    )
}
