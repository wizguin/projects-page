import './Seekbar.css'

import { useState, useEffect, useRef, MouseEvent, MutableRefObject } from 'react'

interface Props {
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    visible: boolean
}

export default function Seekbar({ videoRef, visible }: Props) {
    const [progress, setProgress] = useState(0)

    const seekbarRef = useRef<HTMLDivElement | null>(null)

    const hideSeekbar = visible ? '' : 'hidden'

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
            className={`seekbar-container fade ${hideSeekbar}`}
            role='button'
            onClick={onSeekbarClick}
        >
            <div className='seekbar-bg' ref={seekbarRef}>
                <div className='seekbar' style={{ width: `${progress * 100}%` }}></div>
            </div>
        </div>
    )
}
