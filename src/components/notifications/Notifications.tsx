import { useNotifications } from '../../notifications/NotificationContext'

export default function Notifications() {
    const { notifications } = useNotifications()

    return (
        <div className='notifications'>
            {notifications.map(n => <h1>{n.message}</h1>)}
        </div>
    )
}
