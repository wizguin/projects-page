import './Notification.css'

import { Notification as Props } from '../../../notifications/NotificationContext'

export default function Notification({ message, type }: Props)  {
    return (
        <h1>{message}{type}</h1>
    )
}
