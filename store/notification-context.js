import { createContext, useState } from "react";


 const NotificationContext = createContext({

    notification: null, // { title, message, status }
    showNotification: function( notificationData ){},
    hideNotification: function(){},
});

    const [ activeNotification, setActiveNotification ] = useState();

    function showNotificationHandler( notificationData ){
        setActiveNotification( notificationData );
    }

    function hideNotificationHandler(){
        setActiveNotification( null );
    }

    const context = { notification: activeNotification, ShowNotification: showNotificationHandler, hideNotification: hideNotificationHandler}

export function NotificationContextProvider( props ){
    return(
        <NotificationContext.Provider value={ context }>
            { props.children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext;