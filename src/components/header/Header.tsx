import './Header.css'

import Contact from '../contact/Contact'

import { useState } from 'react'

export interface Props {
    title: string,
    githubUrl?: string,
    contactApiKey?: string
}

export default function Header({ title, githubUrl, contactApiKey }: Props) {
    const [isContactVisible, setIsContactVisible] = useState(false)

    const githubButton = (
        <a className='header-link' href={githubUrl || ''} target='_blank'>
            <i className='fa-brands fa-github'></i>
            <span className='tooltip fade'>GitHub</span>
        </a>
    )

    const contactButton = (
        <div className='header-link' role='button' onClick={() => setIsContactVisible(true)}>
            <i className='fa-solid fa-envelope'></i>
            <span className='tooltip fade'>Contact</span>
        </div>
    )

    return (
        <>
            <header>
                <div className='header-title'>
                    <h1>{title}</h1>

                    <div className='header-links'>
                        {githubUrl && githubButton}
                        {contactApiKey && contactButton}
                    </div>
                </div>
            </header>

            <div className='header-gradient'></div>

            {isContactVisible && <Contact setIsContactVisible={setIsContactVisible} />}
        </>
    )
}
