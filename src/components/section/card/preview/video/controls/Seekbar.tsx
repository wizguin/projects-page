import './Seekbar.css'

import { classNames } from '../../../../../../utils/Utils'

import { useState, useEffect, useRef, useCallback,
    MutableRefObject, Dispatch, SetStateAction, MouseEvent as ReactMouseEvent } from 'react'

interface Props {
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    isVisible: boolean,
    isPlaying: boolean,
    setIsPlaying: Dispatch<SetStateAction<boolean>>
}

export default function Seekbar({ videoRef, isVisible, isPlaying, setIsPlaying }: Props) {
    const [progress, setProgress] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [wasPlaying, setWasPlaying] = useState(isPlaying)

    const seekbarRef = useRef<HTMLDivElement | null>(null)

    // Manual seeking
    const seek = useCallback((clientX: number) => {
        if (!videoRef.current || !seekbarRef.current) {
            return
        }

        const rect = seekbarRef.current.getBoundingClientRect()
        const x = clientX - rect.left

        // Clamp percentage
        const percent = Math.min(1, Math.max(0, x / rect.width))

        videoRef.current.currentTime = videoRef.current.duration * percent

        setProgress(percent)
    }, [videoRef])

    // Update progress every 20ms when not seeking
    useEffect(() => {
        if (!videoRef.current || isSeeking) {
            return
        }

        function updateProgress() {
            if (videoRef.current) {
                setProgress(videoRef.current.currentTime / videoRef.current.duration)
            }
        }

        const interval = setInterval(updateProgress, 20)

        return () => {
            clearInterval(interval)
        }
    }, [videoRef, isSeeking])

    // Mouse events
    useEffect(() => {
        function addEvents() {
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
        }

        function removeEvents() {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }

        function onMouseMove(event: MouseEvent) {
            seek(event.clientX)
        }

        function onMouseUp() {
            if (wasPlaying) {
                setIsPlaying(true)
            }

            setIsSeeking(false)
        }

        if (isSeeking) {
            addEvents()
        } else {
            removeEvents()
        }

        return removeEvents
    }, [isSeeking, seek, setIsPlaying, wasPlaying])

    function onSeekbarDown(event: ReactMouseEvent) {
        event.preventDefault()

        setWasPlaying(isPlaying)
        setIsPlaying(false)
        setIsSeeking(true)

        seek(event.clientX)
    }

    return (
        <div
            className={classNames('seekbar-container fade', !isVisible && !isSeeking && 'hidden')}
            role='button'
            onMouseDown={onSeekbarDown}
            // Prevent click event on video container
            onClick={e => e.stopPropagation()}
        >
            <div className='seekbar-bg' ref={seekbarRef}>
                <div className='seekbar' style={{ width: `${progress * 100}%` }}></div>
            </div>
        </div>
    )
}
