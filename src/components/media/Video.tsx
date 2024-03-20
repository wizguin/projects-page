interface Props {
    src: string
    className: string
}

export default function Video({ src, className }: Props) {
    return (
        <>
            <i className='play-button fa-solid fa-play position-absolute top-50 start-50 translate-middle'></i>

            <video className={className} role='button' onClick={() => console.log('test')}>
                <source src={src} />
            </video>
        </>
    )
}
