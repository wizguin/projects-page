interface Props {
    src: string
}

export default function Image({ src }: Props) {
    return <img src={src} />
}
