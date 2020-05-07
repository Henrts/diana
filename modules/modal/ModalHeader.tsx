import React from "react";
import { withStyles } from "@diana-ui/base";
import { StandardProps, ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import { SectionTitle, Description } from "@diana-ui/typography";

export interface IProps extends StandardProps<"section"> {
  description?: string;
  icon?: JSX.Element;
  showCloseButton?: boolean;
  title: string;
  onClose?: () => void;
}

const stylesheet: ThemeStyleSheetFactory = theme => ({
  header: {
    display: "flex",
    flexDirection: "column"
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  closeIcon: {
    cursor: "pointer"
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
  className,
  cx,
  description,
  icon,
  showCloseButton = true,
  styles,
  title,
  onClose,
  wrappedRef
}) => {
  return (
    <section className={cx("diana-modal-header", styles.header, className)} ref={wrappedRef}>
      <div className={cx(styles.titleWrapper)}>
        {icon && <div className={cx(styles.icon)}>{icon}</div>}
        <SectionTitle className={cx(styles.title)}>{title}</SectionTitle>
        {showCloseButton && (
          <div onClick={onClose} className={cx(styles.closeIcon)}>
            <Icon size={16} name="close" />
          </div>
        )}
      </div>
      {description && <Description className={cx(styles.description)}>{description}</Description>}
    </section>
  );
};

export default withStyles(stylesheet)(ModalHeader);
