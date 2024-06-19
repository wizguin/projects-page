import './Contact.css'

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface Props {
    setIsContactVisible: Dispatch<SetStateAction<boolean>>
}

export default function Contact({ setIsContactVisible }: Props) {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    })

    function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault()
    }

    return (
        <div className='contact fade-in'>

            <div className='lightbox' onClick={() => setIsContactVisible(false)}></div>

            <h2>Contact</h2>

            <form className='contact-form' onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Email Address'
                    onChange={onChange}
                    name='email'
                    value={formData.email}
                />

                <textarea
                    placeholder='Your Message'
                    onChange={onChange}
                    name='message'
                    value={formData.message}
                />

                <button className='button' type='submit'>Submit</button>
            </form>

        </div>
    )
}
