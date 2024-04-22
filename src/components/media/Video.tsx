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
        toggleFullscreen={toggleFullscreen}
    />

    // Set cursor style on mouse over/out
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.cursor = isMouseOver ? 'default' : 'none'
        }
    }, [isMouseOver])

    // Set video playing/paused
    useEffect(() => {
        if (isPlaying) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }
    }, [isPlaying])

    // Set isFullscreen state
    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', onFullscreenChange)

        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenChange)
        }
    }, [])

    // Keyboard shortcuts
    useEffect(() => {
        if (!videoRef.current) {
            return
        }

        const current = videoRef.current

        function onKeyDown(event: KeyboardEvent) {
            switch (event.key) {
                case 'f':
                    toggleFullscreen()
                    break
                case ' ':
                    setIsPlaying(prev => !prev)
                    break
            }
        }

        current.addEventListener('keydown', onKeyDown)

        return () => {
            current.removeEventListener('keydown', onKeyDown)
        }

    }, [])

    function onClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        setIsPlaying(prev => !prev)
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

    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            containerRef.current?.requestFullscreen()
        }
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
                onDoubleClick={toggleFullscreen}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                loop
                muted
                tabIndex={0}
            >
                <source src={src} />
            </video>

            {controls}
        </span>
    )
}
