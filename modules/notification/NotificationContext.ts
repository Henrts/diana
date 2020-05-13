import React from "react";
import { INotification, INotificationStackRef } from "./NotificationStack";

interface INotificationContext {
  addNotification: (notification: INotification) => string | undefined;
  removeNotification: (notificationId: string) => void;
}

const initialNotificationContext = {
  addNotification: () => undefined,
  removeNotification: () => {}
};

export const useNotificationContext: (
  ref: React.RefObject<INotificationStackRef>
) => INotificationContext = ref => {
  const addNotification = (notification: INotification) =>
    ref?.current?.addNotification(notification);
  const removeNotification = (notificationId: string) =>
    ref?.current?.removeNotification(notificationId);

  return {
    addNotification,
    removeNotification
  };
};

export const NotificationContext = React.createContext<INotificationContext>(
  initialNotificationContext
);
export const NotificationProvider = NotificationContext.Provider;
export const NotificationConsumer = NotificationContext.Consumer;
export default useNotificationContext;
