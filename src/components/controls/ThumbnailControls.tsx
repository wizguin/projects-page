import './ThumbnailControls.css'

import { PreviewTypes, getType } from '../types/PreviewTypes'

import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

interface Props {
    media: string[],
    mediaIndex: number,
    setMediaIndex: Dispatch<SetStateAction<number>>
}

export default function ThumbnailControls({ media, mediaIndex, setMediaIndex }: Props) {
    const thumbnails = media.map((fileName, index) => {
        const type = getType(fileName)
        const src = `assets/previews/${fileName}`

        const className = `thumbnail ${index === mediaIndex && 'selected'}`

        const onClick = (event: SyntheticEvent) => {
            event.stopPropagation()
            setMediaIndex(index)
        }

        let thumbnail: JSX.Element

        switch (type) {
            case PreviewTypes.Image:
                thumbnail = <img
                    className={className}
                    src={src}
                    role='button'
                    onClick={onClick}
                />
                break

            case PreviewTypes.Video:
                thumbnail = <video
                    className={className}
                    preload='metadata'
                    src={src}
                    role='button'
                    onClick={onClick}
                />
                break

            default:
                thumbnail =  <></>
                break
        }

        return thumbnail
    })

    return (
        <div className='thumbnails'>
            {thumbnails}
        </div>
    )
}
