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
    const [isLoaded, setIsLoaded] = useState(false)

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

    // Reload video when src changes
    useEffect(() => {
        setIsPlaying(false)
        setIsLoaded(false)

        if (!videoRef.current) {
            return
        }

        const current = videoRef.current

        function onLoad() {
            setIsLoaded(true)
        }

        current.addEventListener('loadeddata', onLoad)
        current.src = src
        current.load()

        return () => {
            current.removeEventListener('loadeddata', onLoad)
        }
    }, [src])

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
                    mouseOver()
                    break
            }
        }

        current.addEventListener('keydown', onKeyDown)

        return () => {
            current.removeEventListener('keydown', onKeyDown)
        }

    }, [])

    // Set container aspect ratio to match video
    useEffect(() => {
        function updateContainer() {
            if (videoRef.current && containerRef.current) {
                containerRef.current.style.aspectRatio = `${videoRef.current.videoWidth} / ${videoRef.current.videoHeight}`
            }
        }

        const current = videoRef.current

        current?.addEventListener('loadeddata', updateContainer)
        window.addEventListener('resize', updateContainer)

        return () => {
            current?.removeEventListener('loadeddata', updateContainer)
            window.addEventListener('resize', updateContainer)
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
            className={`video-container ${isLoaded ? 'fade-in' : 'display-none'}`}
            onClick={onClick}
            onDoubleClick={toggleFullscreen}
            onMouseEnter={mouseOver}
            onMouseLeave={mouseOut}
            onMouseMove={mouseOver}
            onMouseDown={mouseOver}
            onMouseUp={mouseOver}
        >
            <video
                ref={videoRef}
                loop
                muted
                tabIndex={0}
                preload='auto'
                playsInline
            />

            {controls}
        </span>
    )
}
