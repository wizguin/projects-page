import { ReactNode, createContext, useContext, useState } from 'react'

interface Props {
    children: ReactNode
}

export interface Notification {
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
    addError: (message: string) => void
}

const NotificationContext = createContext<NotificationContextArgs | undefined>(undefined)

export function NotificationProvider({ children }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    function addSuccess(message: string) {
        add(message, NotificationType.Success)
    }

    function addError(message: string) {
        add(message, NotificationType.Error)
    }

    function add(message: string, type: NotificationType) {
        setNotifications(prev => [...prev, { message, type }])
    }

    function remove(notification: Notification) {
        setNotifications(prev => prev.filter(n => n === notification))
    }

    return (
        <NotificationContext.Provider value={{ notifications, addSuccess, addError }}>
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
