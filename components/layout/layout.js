import React, { Fragment, useContext } from 'react'
import MainHeader from './main-header'
import NotificationContextProvider from '../../store/notification-context'
import Notification from '../ui/notification'
import NotificationContext from '../../store/notification-context'
function Layout( props ) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
      <NotificationContextProvider>
        <MainHeader />
        <main>{ props.children }</main>
        { activeNotification && (
          <Notification title={ activeNotification.title } message={ activeNotification.message } status={ activeNotification.status } />
          )}
      </NotificationContextProvider>
  )
}

export default Layout