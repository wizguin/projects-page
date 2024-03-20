import { useState, useEffect, useRef, MutableRefObject } from 'react'

interface Props {
    src: string
    className: string
}

export default function Video({ src, className }: Props) {
    const [isPlaying, setIsPlaying] = useState(false)

    const ref: MutableRefObject<HTMLVideoElement | null> = useRef(null)

    const playbackIcon = isPlaying ? 'fa-pause' : 'fa-play'

    useEffect(() => {
        if (isPlaying) {
            ref.current?.play()
        } else {
            ref.current?.pause()
        }
    }, [isPlaying])

    function togglePlayback() {
        setIsPlaying(prev => !prev)
    }

    return (
        <>
            <i className={`play-button fa-solid position-absolute top-50 start-50 translate-middle ${playbackIcon}`}></i>

            <video ref={ref} className={className} role='button' onClick={togglePlayback} loop muted>
                <source src={src} />
            </video>
        </>
    )
}
