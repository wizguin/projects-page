import Image from './media/Image'
import Video from './media/Video'
import PreviewTypes from './types/PreviewTypes'

export interface Props {
    previewType: PreviewTypes
    previewFile: string
}

export default function ProjectPreview({ previewType, previewFile }: Props) {
    const src = `assets/previews/${previewFile}`
    const className = 'preview-content img-fluid object-fit-cover rounded'

    let preview

    switch (previewType) {
        case PreviewTypes.Image:
            preview = <Image src={src} className={className} />
            break

        case PreviewTypes.Video:
            preview = <Video src={src} className={className} />
            break
    }

    return (
        <div className='d-none d-md-block col-md align-self-center p-2 position-relative'>
            {preview}
        </div>
    )
}
