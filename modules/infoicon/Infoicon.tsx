import React from "react";
import { useRegistry } from "@diana-ui/hooks";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps, BaseStylesheet } from "@diana-ui/types";
import { DescriptionMedium, BodyHighlight } from "@diana-ui/typography";

// #region TYPES

export interface IInfoIconProps {
  /**
   * Title for the Infoicon.
   * Can also be a React element
   */
  title?: string | JSX.Element;
  /**
   * Content for the infoicon
   */
  children?: string | JSX.Element;
  /**
   * if it should have padding and border
   */
  withPadding?: boolean;
  /**
   * vertical version of infoicon
   */
  vertical?: boolean;
  /**
   * className to be applied to the wrapper
   */
  className?: string;
  /**
   * name to be picked up from registry for the avatar component
   * usually: 'Avatar' | 'ImageAvatar'
   * defaults to 'Avatar'
   */
  avatarComponentName?: string;
  /**
   * Options to be passed to the avatar component
   */
  avatarOptions?: any;
}

export interface IInfoIconStyles {
  /**
   * InfoIcon component wrapper styles
   */
  infoicon: BaseStylesheet;
  /**
   * Padding / border styles
   */
  withpadding: BaseStylesheet;
  /**
   * Styles for the title | content wrapper
   */
  text: BaseStylesheet;
  /**
   * InfoIcon title styles
   */
  title: BaseStylesheet;
  /**
   * Styles for the content
   */
  content: BaseStylesheet;
}

type IProps = IInfoIconProps & WithStylesProps;

// #endregion

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

const Infoicon: React.FC<IProps> = ({
  cx,
  styles,
  title,
  children,
  withPadding = false,
  vertical = false,
  className,
  avatarComponentName = "Avatar",
  avatarOptions,
  wrappedRef
}) => {
  const StyledAvatar: any = useRegistry(avatarComponentName);

  return (
    <div
      className={cx(
        "diana-infoicon",
        styles.infoicon,
        withPadding && styles.withpadding,
        vertical && "vertical",
        className
      )}
      ref={wrappedRef}
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
