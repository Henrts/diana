/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { StyledComponent } from 'aesthetic-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { WithStylesProps, ThemeStyleSheetFactory } from '../../types';
import { withStyles } from '../../base';

export interface INotification {
  children: string;
  icon?: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  template: StyledComponent<any>;
  title?: string;
}

export interface IProps {
  notifications: INotification[];
  timeout?: number;
  handleMouseOver?: (id: string) => void;
  handleMouseOut?: (id: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  notificationStack: {
    position: 'fixed',
    zIndex: 1000,
    bottom: 0,
    right: 0,
    margin: theme.spaceUnit.md,
  },
});

const NotifcationPresenter: React.FC<IProps & WithStylesProps> = ({
  cx,
  notifications = [],
  styles,
  timeout = 500,
  handleMouseOver,
  handleMouseOut,
}) => {
  return (
    <TransitionGroup className={cx(styles.notificationStack)}>
      {notifications.map((notification: INotification, index) => {
        const { template: Notification } = notification;

        return (
          <CSSTransition key={index} timeout={timeout}>
            <Notification
              {...notification}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              {notification.children}
            </Notification>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default withStyles(styleSheet)(NotifcationPresenter);
