import './ThumbnailControls.css'

import { classNames } from '../../../../../utils/Utils'

import { Dispatch, SetStateAction, MouseEvent } from 'react'

interface Props {
    media: string[],
    mediaIndex: number,
    setMediaIndex: Dispatch<SetStateAction<number>>
}

export default function ThumbnailControls({ media, mediaIndex, setMediaIndex }: Props) {
    const thumbnails = media.map((fileName, index) => {
        const src = `assets/thumbnails/${fileName.split('.')[0]}.jpg`

        const onClick = (event: MouseEvent) => {
            event.stopPropagation()

            setMediaIndex(index)
        }

        return <img
            key={index}
            className={classNames('thumbnail', index === mediaIndex && 'selected')}
            src={src}
            role='button'
            onClick={onClick}
        />
    })

    return (
        <div className='thumbnails'>
            {thumbnails}
        </div>
    )
}
