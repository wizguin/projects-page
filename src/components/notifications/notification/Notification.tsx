import './Notification.css'

import { Notification as Props, NotificationType } from '../../../notifications/NotificationContext'
import { useNotifications } from '../../../notifications/NotificationContext'

export default function Notification({ id, message, type }: Props)  {
    const { remove } = useNotifications()

    let style: string

    switch (type) {
        case NotificationType.Success:
            style = 'success'
            break
        case NotificationType.Error:
            style = 'error'
            break
    }

    return (
        <div
            className={`notification fade-in ${style}`}
            role='button'
            onClick={() => remove(id)}
        >
            {message}{type}
        </div>
    )
}
