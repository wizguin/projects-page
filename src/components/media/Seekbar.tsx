import './Seekbar.css'

import { useState, useEffect, useRef, MouseEvent, MutableRefObject } from 'react'

interface Props {
    videoRef: MutableRefObject<HTMLVideoElement | null>
}

export default function Seekbar({ videoRef }: Props) {
    const [progress, setProgress] = useState(0)

    const seekbarRef = useRef<HTMLDivElement | null>(null)

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

    return (
        <div
            ref={seekbarRef}
            className='seekbar-container'
            role='button'
            onClick={onSeekbarClick}
        >
            <div className='seekbar' style={{ width: `${progress * 100}%` }}></div>
        </div>
    )
}
