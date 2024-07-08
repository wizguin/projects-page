import { useState, useEffect, useRef } from 'react'

interface Props {
    src: string
}

export default function Image({ src }: Props) {
    const [isLoaded, setIsLoaded] = useState(false)

    const imageRef = useRef<HTMLImageElement | null>(null)

    const spinner = <span className='spinner'></span>

    useEffect(() => {
        setIsLoaded(false)

        function onLoad() {
            setIsLoaded(true)
        }

        const current = imageRef.current

        current?.addEventListener('load', onLoad)

        return () => {
            current?.removeEventListener('load', onLoad)
        }
    }, [src])

    return (
        <>
            {!isLoaded && spinner}

            <img
                ref={imageRef}
                className={isLoaded ? 'fade-in' : 'display-none'}
                src={src}
            />
        </>

    )
}
