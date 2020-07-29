/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useCallback, useImperativeHandle, useRef, useState } from "react";
import { StyledComponent } from "aesthetic-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import { withStyles } from "@diana-ui/base";
import { useRegistry } from "@diana-ui/hooks";
import { IIconProps } from "@diana-ui/icon";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { IProps as INotificationProps } from "./Notification";

export interface INotification {
  className?: string;
  displayDuration?: number;
  hasTimeout?: boolean;
  iconProps?: IIconProps | any;
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  template?: StyledComponent<any>;
  text: string | JSX.Element;
  title?: string | JSX.Element;
}

export interface INotificationStackRef {
  addNotification: (notification: INotification) => string;
  removeNotification: (notificationId: string) => void;
}

export interface IProps {
  className?: string;
  displayDuration?: number;
  transitionTimeout?: number;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  notificationStack: {
    position: "fixed",
    zIndex: 1000,
    bottom: 0,
    right: 0,
    margin: theme.spaceUnit.md
  }
});

const NotifcationStack: React.FC<IProps & WithStylesProps> = ({
  className,
  cx,
  displayDuration = 4000,
  styles,
  transitionTimeout = 500,
  wrappedRef
}) => {
  const BaseNotification = useRegistry<INotificationProps>("Notification");
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [timeouts, setTimeouts] = useState<{ [notificationId: string]: any }>({});
  const notificationsRef = useRef(notifications);
  notificationsRef.current = notifications;

  const handleRemoveNotification = useCallback((notificationId: string) => {
    const currentNotifications = notificationsRef.current;
    const index = currentNotifications.findIndex(
      notification => notification.id === notificationId
    );

    if (index >= 0) {
      const newNotifications = [...currentNotifications];
      newNotifications.splice(index, 1);

      setNotifications(newNotifications);
    }
  }, []);

  const clearNotificationTimeout = useCallback((notificationId: string) => {
    setTimeouts(currTimeouts => {
      const { [notificationId]: timeout, ...restTimeouts } = currTimeouts;
      clearTimeout(timeout);

      return restTimeouts;
    });
  }, []);

  const setNotificationTimeout = useCallback(
    (notificationId: string, notification?: INotification) => {
      if (notification && notification.hasTimeout !== false) {
        const duration =
          notification.displayDuration && notification.displayDuration > 0
            ? notification.displayDuration
            : displayDuration;

        const notificationTimeout = setTimeout(() => {
          handleRemoveNotification(notificationId);
          clearNotificationTimeout(notificationId);
        }, duration);

        setTimeouts({ ...timeouts, [notificationId]: notificationTimeout });
      }
    },
    [clearNotificationTimeout, displayDuration, handleRemoveNotification, timeouts]
  );

  const handleAddNotification = useCallback(
    (notification: INotification) => {
      const id = uuid();
      setNotifications([...notificationsRef.current, { ...notification, id }]);
      setNotificationTimeout(id, notification);

      return id;
    },
    [setNotificationTimeout]
  );

  const handleMouseOver = useCallback(
    (id: string) => {
      clearNotificationTimeout(id);
    },
    [clearNotificationTimeout]
  );

  const handleMouseOut = useCallback(
    (id: string) => {
      const notification = notifications.find(not => not.id === id);
      setNotificationTimeout(id, notification);
    },
    [notifications, setNotificationTimeout]
  );

  useImperativeHandle<INotificationStackRef, INotificationStackRef>(wrappedRef, () => ({
    addNotification: handleAddNotification,
    removeNotification: handleRemoveNotification
  }));

  return (
    <TransitionGroup
      className={cx("diana-notification-stack", styles.notificationStack, className)}
      ref={wrappedRef}
    >
      {notifications.map((notification: INotification) => {
        const { id, template: Notification = BaseNotification } = notification;

        return (
          <CSSTransition key={id} timeout={transitionTimeout}>
            <Notification
              {...notification}
              id={id || uuid()}
              onMouseOver={notification.hasTimeout !== false ? handleMouseOver : undefined}
              onMouseOut={notification.hasTimeout !== false ? handleMouseOut : undefined}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

NotifcationStack.displayName = "NotifcationStack";

export default withStyles(styleSheet, { register: true })(NotifcationStack);
