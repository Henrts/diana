import React, { PropsWithChildren } from "react";
import { useRegistry } from "@diana-ui/hooks";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { DescriptionMedium, BodyHighlight } from "@diana-ui/typography";
import { IAvatarProps } from "@diana-ui/avatar";

export interface IInfoIconProps {
  title?: string;
  children?: string | JSX.Element;
  withPadding?: boolean;
  vertical?: boolean;
  className?: string;
  avatarComponentName?: string;
  avatarOptions?: any;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  infoicon: {
    height: "auto",
    display: "flex"
  },
  vertical: {},
  withpadding: {
    border: "1px solid lightgrey",
    borderRadius: 10,
    padding: "14px 24px"
  },
  text: {
    display: "flex",
    marginLeft: theme.spaceUnit.md,
    flexDirection: "column",
    paddingTop: theme.spaceUnit.xxs
  },
  textVertical: {},
  title: {},
  body: {}
});

type IProps = IInfoIconProps & WithStylesProps;

const Infoicon: React.FC<IProps> = ({
  cx,
  styles,
  title,
  children,
  withPadding = false,
  vertical = false,
  className,
  avatarComponentName = "Avatar",
  avatarOptions
}) => {
  const StyledAvatar: any = useRegistry(avatarComponentName);

  return (
    <div
      className={cx(
        styles.infoicon,
        withPadding && styles.withpadding,
        vertical && styles.vertical,
        className
      )}
    >
      <StyledAvatar {...avatarOptions} />
      <div className={cx(styles.text, vertical && styles.textVertical)}>
        {title && (
          <DescriptionMedium className={cx(styles.title)}>
            {title}
          </DescriptionMedium>
        )}
        {(children && typeof children === "string" && (
          <BodyHighlight>{children}</BodyHighlight>
        )) ||
          children}
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(Infoicon);
