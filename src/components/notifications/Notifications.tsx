import './Notifications.css'

import Notification from './notification/Notification'
import { useNotifications } from '../../notifications/NotificationContext'

export default function Notifications() {
    const { notifications, addSuccess } = useNotifications()

    window.onkeyup = () => addSuccess('test')

    const notificationComponents = notifications.map((notification) => (
        <Notification key={notification.id} {...notification} />
    ))

    return (
        <div className='notifications'>
            {notificationComponents}
        </div>
    )
}
