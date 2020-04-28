import React from "react";
import { useRegistry } from "@diana-ui/hooks";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { DescriptionMedium, BodyHighlight } from "@diana-ui/typography";

export interface IInfoIconProps {
  title?: string | JSX.Element;
  children?: string | JSX.Element;
  withPadding?: boolean;
  vertical?: boolean;
  className?: string;
  avatarComponentName?: string;
  avatarOptions?: any;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  infoicon: {
    display: "flex",
    "@selectors": {
      "&.vertical": {}
    }
  },
  withpadding: {
    border: "1px solid lightgrey",
    borderRadius: 10,
    padding: "14px 24px"
  },
  text: {
    display: "flex",
    marginLeft: theme.spaceUnit.md,
    flexDirection: "column",
    paddingTop: theme.spaceUnit.xxs,
    "@selectors": {
      "&.vertical": {}
    }
  },
  title: {
    textAlign: "left",
    "@selectors": {
      "&.vertical": {
        textAlign: "center"
      }
    }
  },
  content: {
    textAlign: "left",
    "@selectors": {
      "&.vertical": {
        textAlign: "center"
      }
    }
  }
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
        vertical && "vertical",
        className
      )}
    >
      <StyledAvatar {...avatarOptions} />
      <div className={cx(styles.text, vertical && "vertical")}>
        {title && typeof title === "string" ? (
          <DescriptionMedium className={cx(styles.title, vertical && "vertical")}>
            {title}
          </DescriptionMedium>
        ) : (
          title
        )}
        {(children && typeof children === "string" && (
          <BodyHighlight className={cx(styles.content, vertical && "vertical")}>
            {children}
          </BodyHighlight>
        )) ||
          children}
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(Infoicon);
