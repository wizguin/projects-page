import './DropdownButton.css'

import { classNames } from '../../../../utils/Utils'

import { useState, useEffect, useRef } from 'react'

type Option = { label: string, url: string }

export interface Props {
    label: string,
    options: Option[]
}

export default function DropdownButton({ label, options }: Props) {
    const [isOpen, setIsOpen] = useState(false)

    const buttonRef = useRef<HTMLAnchorElement | null>(null)

    const dropdownMenu = (
        <div
            className={
                classNames('dropdown-menu fade-in', !isOpen && 'display-none')
            }
            style={{
                minWidth: buttonRef.current ? buttonRef.current.clientWidth : 0
            }}
        >
            {options.map(option => dropdownItem(option))}
        </div>
    )

    function dropdownItem(option: Option) {
        return (
            <a
                className='button'
                href={option.url}
                target='_blank'
                role='button'
            >
                {option.label}
            </a>
        )
    }

    // Mouse events
    useEffect(() => {
        function addEvents() {
            window.addEventListener('mouseup', onMouseUp)
        }

        function removeEvents() {
            window.removeEventListener('mouseup', onMouseUp)
        }

        function onMouseUp(event: MouseEvent) {
            // Close if mouse event was outside toggle button
            if (event.button === 0
                && buttonRef.current
                && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            addEvents()
        } else {
            removeEvents()
        }

        return removeEvents
    }, [isOpen])

    return (
        <div>
            <a
                ref={buttonRef}
                className='dropdown-button button button-secondary'
                role='button'
                onClick={() => setIsOpen(!isOpen)}
            >
                {label}

                <i className='dropdown-chevron fa-solid fa-chevron-down'></i>
            </a>

            {dropdownMenu}
        </div>
    )
}
