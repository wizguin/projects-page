import { ReactNode, createContext, useContext, useState } from 'react'

interface Props {
    children: ReactNode
}

export interface Notification {
    id: number,
    message: string,
    type: NotificationType
}

enum NotificationType {
    Success,
    Error
}

interface NotificationContextArgs {
    notifications: Notification[],
    addSuccess: (message: string) => void,
    addError: (message: string) => void,
    remove: (id: number) => void
}

const NotificationContext = createContext<NotificationContextArgs | undefined>(undefined)

export function NotificationProvider({ children }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [notificationId, setNotificationId] = useState(1)

    function addSuccess(message: string) {
        add(message, NotificationType.Success)
    }

    function addError(message: string) {
        add(message, NotificationType.Error)
    }

    function add(message: string, type: NotificationType) {
        const id = notificationId

        setNotificationId(prev => prev + 1)
        setNotifications(prev => [{ id, message, type }, ...prev])
    }

    function remove(id: number) {
        setNotifications(prev => prev.filter(notification => notification.id !== id))
    }

    return (
        <NotificationContext.Provider value={{ notifications, addSuccess, addError, remove }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)

    if (!context) {
        throw new Error('NotificationContext.Provider not found')
    }

    return context
}
