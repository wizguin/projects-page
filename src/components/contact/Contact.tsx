import './Contact.css'

import { useNotifications } from '../../notifications/NotificationContext'

import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react'

interface Props {
    setIsContactVisible: Dispatch<SetStateAction<boolean>>
}

interface Response {
    message: string,
    success: boolean
}

export default function Contact({ setIsContactVisible }: Props) {
    const [formData, setFormData] = useState({
        email: '',
        message: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const { addSuccess, addError } = useNotifications()

    function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    function onSubmit(event: FormEvent) {
        event.preventDefault()

        setIsLoading(true)

        const body = new FormData()

        body.append('email', formData.email)
        body.append('message', formData.message)
        body.append('access_key', 'key')

        submitForm(body)
    }

    async function submitForm(body: FormData) {
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: body
            })

            const json = await response.json() as Response

            setIsLoading(false)
            handleResponse(json)

        } catch (error) {
            if (error instanceof Error) {
                addError(error.message)
            }

            setIsLoading(false)
        }
    }

    function handleResponse(response: Response) {
        if (response.success) {
            addSuccess(response.message)
            setIsContactVisible(false)
        } else {
            addError(response.message)
        }
    }

    const spinner = <span className='spinner'></span>

    return (
        <div className='contact fade-in'>

            <div className='lightbox' onClick={() => setIsContactVisible(false)}></div>

            <h2>Contact</h2>

            <form className='contact-form' onSubmit={onSubmit}>
                <input
                    placeholder='Email Address'
                    onChange={onChange}
                    name='email'
                    value={formData.email}
                    type='email'
                    required={true}
                    maxLength={320}
                />

                <textarea
                    placeholder='Your Message'
                    onChange={onChange}
                    name='message'
                    value={formData.message}
                    required={true}
                    maxLength={1000}
                />

                <button className='button' type='submit'>
                    {isLoading ? spinner : 'Submit'}
                </button>
            </form>

        </div>
    )
}
