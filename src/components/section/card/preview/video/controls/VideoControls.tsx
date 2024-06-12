import './VideoControls.css'

import { classNames } from '../../../../../../utils/Utils'
import Seekbar from './Seekbar'

import { MutableRefObject, Dispatch, SetStateAction, MouseEvent } from 'react'

interface Props {
    videoRef: MutableRefObject<HTMLVideoElement | null>,
    isExpanded: boolean,
    isMouseOver: boolean,
    isPlaying: boolean,
    setIsPlaying: Dispatch<SetStateAction<boolean>>,
    isFullscreen: boolean,
    toggleFullscreen: () => void
}

export default function VideoControls({ videoRef, isExpanded, isMouseOver, isPlaying, setIsPlaying , isFullscreen, toggleFullscreen}: Props) {
    const isLargeView = isExpanded || isFullscreen

    const playState = isLargeView ? 'play-corner' : 'play-center'
    const playIcon = isPlaying ? 'fa-pause' : 'fa-play'

    const fullscreenIcon = isFullscreen ? 'fa-compress' : 'fa-expand'

    const controlVisible = isPlaying && !isMouseOver ? 'hidden' : ''

    const playButton = controlButton(onPlayClick, 'play-button', playState, playIcon, controlVisible)
    const fullscreenButton = controlButton(onFullscreenClick, 'fullscreen-button', fullscreenIcon, controlVisible)

    const seekbar = <Seekbar
        videoRef={videoRef}
        isVisible={!isPlaying || isMouseOver}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
    />

    const controlsShadow = <div className={`controls-shadow fade ${controlVisible}`}></div>

    function onPlayClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        setIsPlaying(prev => !prev)
    }

    function onFullscreenClick(event: MouseEvent) {
        event.preventDefault()
        event.stopPropagation()

        toggleFullscreen()
    }

    function controlButton(onClick: (event: MouseEvent) => void, ...classes: string[]) {
        return (
            <i
                className={classNames('fa-solid fade', ...classes)}
                role='button'
                onClick={onClick}
            ></i>
        )
    }

    return (
        <>
            {playButton}
            {isLargeView && fullscreenButton}
            {isLargeView && seekbar}
            {isLargeView && controlsShadow}
        </>
    )
}
