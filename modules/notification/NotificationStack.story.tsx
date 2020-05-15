import React, { useContext, useRef, useState } from "react";
import { BaseButton } from "@diana-ui/button";
import NotificationStack, { INotification, INotificationStackRef } from "./NotificationStack";
import { getNotificationContext, useNotificationContext } from "./NotificationContext";

const NotificationContext = getNotificationContext();
const { Provider: NotificationProvider } = NotificationContext;

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const NotificationStackExample: React.FC<{}> = () => {
  const ref = useRef<INotificationStackRef>(null);
  const notificationContext = useNotificationContext(ref);

  return (
    <NotificationProvider value={notificationContext}>
      <NotificationStackActions />
      <NotificationStack wrappedRef={ref} />
    </NotificationProvider>
  );
};

const NotificationStackActions: React.FC<{}> = () => {
  const notificationContext = useContext(NotificationContext);

  const [notificationIds, setNotificationIds] = useState<string[]>([]);
  const notification1: INotification = {
    text: "Notification"
  };
  const notification2: INotification = {
    iconProps: { name: "checkmark" },
    text: "Icon Notification",
    title: "Title with icon"
  };
  const notification3: INotification = {
    hasTimeout: false,
    text: "I have to be removed manually!",
    title: "Notification without timeout"
  };
  const notificationList: INotification[] = [notification1, notification2, notification3];

  const addNotification = () => {
    if (notificationIds.length < 5) {
      const rand = getRandomNumber(0, 3);

      const id = notificationContext.addNotification(notificationList[rand]) || "";
      setNotificationIds([...notificationIds, id]);
    }
  };

  const removeNotification = () => {
    if (notificationIds.length > 0) {
      const rand = getRandomNumber(0, notificationIds.length);
      const newIds = [...notificationIds];
      newIds.splice(rand, 1);

      notificationContext.removeNotification(notificationIds[rand]);
      setNotificationIds(newIds);
    }
  };

  return (
    <div style={{ display: "flex", margin: "32px 0" }}>
      <BaseButton
        style={{ marginRight: "8px" }}
        disabled={notificationIds.length === 5}
        onClick={addNotification}
      >
        Add Notification
      </BaseButton>
      <BaseButton disabled={notificationIds.length === 0} onClick={removeNotification}>
        Remove Notification
      </BaseButton>
    </div>
  );
};
