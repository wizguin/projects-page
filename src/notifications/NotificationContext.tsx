import { ReactNode, createContext, useContext, useState } from 'react'

interface Props {
    children: ReactNode
}

interface Notification {
    message: string
}

interface NotificationContextArgs {
    notifications: Notification[],
    add: (notification: Notification) => void,
    remove: (notification: Notification) => void
}

const NotificationContext = createContext<NotificationContextArgs | undefined>(undefined)

export function NotificationProvider({ children }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    function add(notification: Notification) {
        setNotifications(prev => [...prev, notification])
    }

    function remove(notification: Notification) {
        setNotifications(prev => prev.filter(n => n === notification))
    }

    return (
        <NotificationContext.Provider value={{ notifications, add, remove }}>
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
