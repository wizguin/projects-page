import './ThumbnailControls.css'

import Image from '../image/Image'
import { classNames } from '../../../../../utils/Utils'

import { Dispatch, SetStateAction, MouseEvent } from 'react'

interface Props {
    media: string[],
    mediaIndex: number,
    setMediaIndex: Dispatch<SetStateAction<number>>
}

export default function ThumbnailControls({ media, mediaIndex, setMediaIndex }: Props) {
    const thumbnails = media.map((fileName, index) => {
        const src = `/thumbnails/${fileName.split('.')[0]}.jpg`

        const onClick = (event: MouseEvent) => {
            event.stopPropagation()

            setMediaIndex(index)
        }

        return (
            <div
                key={index}
                className={classNames('thumbnail', index === mediaIndex && 'selected')}
                role='button'
                onClick={onClick}
            >
                <Image src={src} />
            </div>
        )
    })

    return (
        <div className='thumbnails'>
            {thumbnails}
        </div>
    )
}
