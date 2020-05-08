import { Theme } from "@diana-ui/types";
import Notification from "./Notification";

export const SuccessNotification = Notification.extendStyles(
  (theme: Theme) => ({
    icon: {
      marginBottom: theme.spaceUnit.md,
      marginRight: theme.spaceUnit.md,
      stroke: theme.colors.white
    },
    text: {},
    title: {
      marginBottom: theme.spaceUnit.md
    },
    wrapper: {
      backgroundColor: theme.colors.black,
      borderRadius: "10px",
      color: theme.colors.white,
      padding: theme.spaceUnit.md,
      width: "200px",
      "@selectors": {
        "&:not(:first-child)": {
          marginTop: theme.spaceUnit.xs
        }
      }
    }
  }),
  { register: true }
);
