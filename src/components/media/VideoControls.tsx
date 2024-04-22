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

    const playState = isExpanded || isFullscreen ? 'play-corner' : 'play-center'
    const playIcon = isPlaying ? 'fa-pause' : 'fa-play'
    const iconVisible = isPlaying && !isMouseOver ? 'hidden' : ''
    const playButton = controlButton(onPlayClick, 'play-button', playState, playIcon, iconVisible)

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

    function controlButton(onClick: (event: MouseEvent) => void, ...classNames: string[]) {
        console.log(`${classNames.join(' ')} fa-solid fade`)
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

            {(isExpanded || isFullscreen) && seekbar}
        </>
    )

}
