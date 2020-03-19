import React from "react";
import { useRegistry } from "@diana-ui/hooks";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { DescriptionMedium } from "@diana-ui/typography";

export interface IProps {
  title: string;
  withPadding?: boolean;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  infoicon: {
    height: 80,
    display: "flex"
  },
  wrapper: {
    display: "flex"
  },
  withpadding: {
    border: "1px solid lightgrey",
    borderRadius: 10,
    padding: "14px 24px"
  },
  text: {
    display: "flex",
    marginLeft: 8
  }
});

const Infoicon: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  title,
  withPadding = false
}) => {
  const StyledAvatar = useRegistry("Avatar");

  return (
    <div className={cx(styles.infoicon)}>
      <div className={cx(styles.wrapper, withPadding && styles.withpadding)}>
        <StyledAvatar />
        <div className={cx(styles.text)}>
          {title && <DescriptionMedium>{title}</DescriptionMedium>}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(Infoicon);
