import './Notification.css'

import { Notification as Props } from '../../../notifications/NotificationContext'
import { useNotifications } from '../../../notifications/NotificationContext'

export default function Notification({ id, message, type }: Props)  {
    const { remove } = useNotifications()

    return (
        <div
            className='notification fade-in'
            role='button'
            onClick={() => remove(id)}
        >
            {message}{type}
        </div>
    )
}
