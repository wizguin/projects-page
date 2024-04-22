import './VideoControls.css'

import Seekbar from './Seekbar'

import { MutableRefObject, Dispatch, SetStateAction, MouseEvent } from 'react'

interface Props {
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    isExpanded: boolean,
    isMouseOver: boolean,
    isPlaying: boolean,
    setIsPlaying: Dispatch<SetStateAction<boolean>>,
    isFullscreen: boolean
}

export default function VideoControls({ videoRef, isExpanded, isMouseOver, isPlaying, setIsPlaying , isFullscreen}: Props) {

    const playIcon = isPlaying ? 'fa-pause' : 'fa-play'
    const hidePlayButton = isPlaying && !isMouseOver ? 'hidden' : ''

    const seekbar = <Seekbar
        videoRef={videoRef}
        visible={isMouseOver}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
    />

    function onPlayClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        setIsPlaying(prev => !prev)
    }

    return (
        <>
            <i
                className={`play-button fa-solid fade ${playIcon} ${hidePlayButton}`}
                role='button'
                onClick={onPlayClick}
            ></i>

             {(isExpanded || isFullscreen) && seekbar}
        </>
    )

}
