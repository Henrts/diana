import React from "react";
import { INotification, INotificationStackRef } from "./NotificationStack";

export interface INotificationContext<T = INotification> {
  addNotification: (notification: T) => string | undefined;
  removeNotification: (notificationId: string) => void;
}

const initialNotificationContext = {
  addNotification: () => undefined,
  removeNotification: () => {}
};

export const useNotificationContext = <
  T extends INotificationStackRef = INotificationStackRef,
  ICustomNotification extends INotification = INotification
>(
  ref: React.RefObject<T>
): INotificationContext<ICustomNotification> => {
  const addNotification = (notification: ICustomNotification) =>
    ref?.current?.addNotification(notification);
  const removeNotification = (notificationId: string) =>
    ref?.current?.removeNotification(notificationId);

  return {
    addNotification,
    removeNotification
  };
};

export const getNotificationContext = <T extends INotification = INotification>() =>
  React.createContext<INotificationContext<T>>(initialNotificationContext);
