import './ProjectPreview.css'

import Image from './media/Image'
import Video from './media/Video'
import PreviewTypes from './types/PreviewTypes'

export interface Props {
    previewType: PreviewTypes
    previewFile: string
}

export default function ProjectPreview({ previewType, previewFile }: Props) {
    const src = `assets/previews/${previewFile}`

    let preview

    switch (previewType) {
        case PreviewTypes.Image:
            preview = <Image src={src} />
            break

        case PreviewTypes.Video:
            preview = <Video src={src} />
            break
    }

    return (
        <div className='card-preview'>
            {preview}
        </div>
    )
}
