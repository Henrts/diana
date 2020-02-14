import React from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import { SectionTitle, Description } from "@diana-ui/typography";

export interface IProps {
  title: string;
  onClose?: () => void;
  description?: string;
  icon?: JSX.Element;
}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  header: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "24px"
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spaceUnit.xs
  },
  title: {
    flex: 1
  },
  description: {
    marginTop: theme.spaceUnit.xs
  }
});

const ModalHeader: React.FC<IProps & WithStylesProps> = ({
  cx,
  styles,
  icon,
  title,
  description,
  onClose
}) => {
  return (
    <section className={cx(styles.header)}>
      <div className={cx(styles.titleWrapper)}>
        {icon && <div className={cx(styles.icon)}>{icon}</div>}
        <SectionTitle className={cx(styles.title)}>{title}</SectionTitle>
        <div onClick={onClose}>
          <Icon size={16} name="close" />
        </div>
      </div>
      {description && (
        <Description className={cx(styles.description)}>
          {description}
        </Description>
      )}
    </section>
  );
};

export default withStyles(stylesheet)(ModalHeader);
