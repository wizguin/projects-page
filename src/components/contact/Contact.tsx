import './Contact.css'

import { ChangeEvent, FormEvent, useState } from 'react'

export default function Contact() {
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
        <div className='contact'>

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
