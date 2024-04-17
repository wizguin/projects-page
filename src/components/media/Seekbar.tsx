import './Seekbar.css'

import { useState, useEffect, useRef, useCallback,
    MutableRefObject, MouseEvent as ReactMouseEvent } from 'react'

interface Props {
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    visible: boolean
}

export default function Seekbar({ videoRef, visible }: Props) {
    const [progress, setProgress] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)

    const seekbarRef = useRef<HTMLDivElement | null>(null)

    const hideSeekbar = visible ? '' : 'hidden'

    const seek = useCallback((clientX: number) => {
        if (!seekbarRef.current) return

        const rect = seekbarRef.current.getBoundingClientRect()
        const x = clientX - rect.left
        const percent = x / rect.width

        if (videoRef.current) {
            videoRef.current.currentTime = videoRef.current.duration * percent
        }
    }, [videoRef])

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
    }, [videoRef])

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

        function onMouseUp()  {
            setIsSeeking(false)
        }

        if (isSeeking) {
            addEvents()
        } else {
            removeEvents()
        }

        return removeEvents
    }, [isSeeking, seek])

    function onSeekbarClick(event: ReactMouseEvent) {
        seek(event.clientX)
    }

    function onSeekbarDown(event: ReactMouseEvent) {
        event.preventDefault()

        setIsSeeking(true)
    }

    return (
        <div
            className={`seekbar-container fade ${hideSeekbar}`}
            role='button'
            onClick={onSeekbarClick}
            onMouseDown={onSeekbarDown}
        >
            <div className='seekbar-bg' ref={seekbarRef}>
                <div className='seekbar' style={{ width: `${progress * 100}%` }}></div>
            </div>
        </div>
    )
}
