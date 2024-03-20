interface Props {
    src: string
    className: string
}

export default function Image({ src, className }: Props) {
    return <img src={src} className={className} />
}
