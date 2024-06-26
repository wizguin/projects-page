import './Notifications.css'

import Notification from './notification/Notification'
import { useNotifications } from '../../notifications/NotificationContext'

export default function Notifications() {
    const { notifications, addSuccess } = useNotifications()

    window.onclick = () => addSuccess('test')

    return (
        <div className='notifications'>
            {notifications.map(n => Notification(n))}
        </div>
    )
}
