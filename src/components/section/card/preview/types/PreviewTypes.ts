const imageExt = ['jpg', 'jpeg', 'png', 'gif']
const videoExt = ['mp4', 'webm']

export enum PreviewTypes {
    Image,
    Video
}

export function getType(fileName: string) {
    const ext = fileName.split('.').pop()

    if (!ext) {
        return null
    }

    if (imageExt.includes(ext)) {
        return PreviewTypes.Image
    }

    if (videoExt.includes(ext)) {
        return PreviewTypes.Video
    }
}
