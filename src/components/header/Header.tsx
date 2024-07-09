import './Header.css'

import Contact from '../contact/Contact'

import { useState } from 'react'

const TITLE: string = import.meta.env.VITE_TITLE
const GITHUB_URL: string = import.meta.env.VITE_GITHUB_URL
const CONTACT_API_KEY: string = import.meta.env.VITE_CONTACT_API_KEY

export default function Header() {
    const [isContactVisible, setIsContactVisible] = useState(false)

    const githubButton = (
        <a className='header-link' href={GITHUB_URL} target='_blank'>
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

    const contact = (
        <Contact
            setIsContactVisible={setIsContactVisible}
        />
    )

    return (
        <>
            <header>
                <div className='header-title'>
                    <h1>{TITLE}</h1>

                    <div className='header-links'>
                        {GITHUB_URL && githubButton}
                        {CONTACT_API_KEY && contactButton}
                    </div>
                </div>
            </header>

            <div className='header-gradient'></div>

            {isContactVisible && contact}
        </>
    )
}
