import './VideoControls.css'

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

    const iconVisible = isPlaying && !isMouseOver ? 'hidden' : ''

    const playButton = controlButton(onPlayClick, 'play-button', playState, playIcon, iconVisible)
    const fullscreenButton = controlButton(onFullscreenClick, 'fullscreen-button', fullscreenIcon, iconVisible)

    const seekbar = <Seekbar
        videoRef={videoRef}
        visible={!isPlaying || isMouseOver}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
    />

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

    function controlButton(onClick: (event: MouseEvent) => void, ...classNames: string[]) {
        return (
            <i
                className={`${classNames.join(' ')} fa-solid fade`}
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
        </>
    )

}
