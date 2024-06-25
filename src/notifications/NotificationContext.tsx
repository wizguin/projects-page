import { ReactNode, createContext, useContext, useState } from 'react'

interface Props {
    children: ReactNode
}

interface Notification {
    message: string
}

interface NotificationContextArgs {
    notifications: Notification[]
}

const NotificationContext = createContext<NotificationContextArgs | undefined>(undefined)

export function NotificationProvider({ children }: Props) {
    const [notifications, setNotifications] = useState<Notification[]>([{ message: 'test notification' }])

    return (
        <NotificationContext.Provider value={{ notifications }}>
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
