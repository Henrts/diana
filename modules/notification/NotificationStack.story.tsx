import React, { useState } from "react";
import { BaseButton } from "@diana/button";
import NotificationStack, { INotification } from "./NotificationStack";
import { SuccessNotification } from "./Notification.story";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const NotificationStackExample: React.FC<{}> = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const notification1: INotification = {
    children: "Notificaiton",
    template: SuccessNotification,
  };
  const notification2: INotification = {
    children: "Icon notificaiton",
    icon: "check",
    template: SuccessNotification,
  };
  const notification3: INotification = {
    children: "Title notificaiton",
    title: "Big Title",
    template: SuccessNotification,
  };
  const notificationList: INotification[] = [
    notification1,
    notification2,
    notification3,
  ];

  const addNotification = () => {
    if (notifications.length < 5) {
      const rand = getRandomNumber(0, 3);

      setNotifications([...notifications, notificationList[rand]]);
    }
  };

  const removeNotification = () => {
    if (notifications.length > 0) {
      const rand = getRandomNumber(0, notifications.length);
      const newNotifications = [...notifications];

      newNotifications.splice(rand, 1);

      setNotifications(newNotifications);
    }
  };

  const handleMouseOver = (id: string) => {
    console.log("OVER: ", id);
  };

  const handleMouseOut = (id: string) => {
    console.log("OUT: ", id);
  };

  return (
    <>
      <div style={{ display: "flex", margin: "32px 0" }}>
        <BaseButton
          style={{ marginRight: "8px" }}
          disabled={notifications.length === 5}
          onClick={addNotification}
        >
          Add Notification
        </BaseButton>
        <BaseButton
          disabled={notifications.length === 0}
          onClick={removeNotification}
        >
          Remove Notification
        </BaseButton>
      </div>
      <NotificationStack
        notifications={notifications}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
      />
    </>
  );
};
