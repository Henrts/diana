import React, { useContext } from "react";
import aesthetic, { ThemeName, ThemeSheet } from "aesthetic";
import hoistNonReactStatics from "hoist-non-react-statics";
import uuid from "uuid/v4";
import deepMerge from "extend";
import { StyledComponent } from "aesthetic-react";
import {
  ThemeStyleSheetFactory,
  WithStylesProps,
  WithStylesOptions
} from "../types";
import useStyles from "./useStyles";

/**
 * Wrap a React component with an HOC that injects the defined style sheet as a prop.
 */
function withStyles<Theme = ThemeSheet, T = unknown>(
  styleSheet: ThemeStyleSheetFactory<T>,
  options: WithStylesOptions = { extendable: true }
) /* infer */ {
  const {
    cxPropName = aesthetic.options.cxPropName,
    extendable = aesthetic.options.extendable,
    extendFrom = "",
    passThemeProp = aesthetic.options.passThemeProp,
    stylesPropName = aesthetic.options.stylesPropName,
    themePropName = aesthetic.options.themePropName
  } = options;

  return function withStylesComposer<Props extends object = {}>(
    WrappedComponent: React.ComponentType<
      Props & WithStylesProps & { parentStylesheet?: typeof styleSheet }
    >
  ): StyledComponent<
    Props & WithStylesProps & { parentStylesheet?: typeof styleSheet }
  > {
    const baseName = WrappedComponent.displayName || WrappedComponent.name;
    const styleName = `${baseName}-${uuid()}`;

    // We must register earlier so that extending styles works correctly
    aesthetic.registerStyleSheet(styleName, styleSheet, extendFrom);

    const WithStyles = React.memo(function WithStyles(
      props: Props & WithStylesProps & { parentStylesheet: typeof styleSheet }
    ) {
      const themeName = useContext(React.createContext<ThemeName>(""));
      const mergedStylesheet = deepMerge(
        true,
        {},
        aesthetic.getStyleSheet(styleName, themeName || "default_theme"),
        styleSheet(aesthetic.getTheme()),
        props.parentStylesheet
          ? props.parentStylesheet(aesthetic.getTheme())
          : {}
      );

      const [styles, cx] = useStyles(() => mergedStylesheet);

      const extraProps: WithStylesProps & {
        parentStylesheet?: typeof styleSheet;
      } = {
        [cxPropName as "cx"]: cx,
        [stylesPropName as "styles"]: styles,
        ref: props.wrappedRef
      };

      if (passThemeProp) {
        extraProps[themePropName as "theme"] = aesthetic.getTheme(themeName);
      }

      extraProps.parentStylesheet = styleSheet;
      return <WrappedComponent {...props} {...extraProps} />;
    }) as StyledComponent<
      Props & WithStylesProps & { parentStylesheet?: typeof styleSheet }
    >;

    hoistNonReactStatics(WithStyles, WrappedComponent);

    WithStyles.displayName = `withStyles(${baseName})`;

    WithStyles.styleName = styleName;

    WithStyles.WrappedComponent = WrappedComponent;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    WithStyles.extendStyles = (customStyleSheet, extendOptions) => {
      if (!extendable) {
        throw new Error(`${baseName} is not extendable.`);
      }

      return withStyles<Theme>(customStyleSheet, {
        ...options,
        ...extendOptions,
        extendFrom: styleName
      })(WrappedComponent);
    };

    return WithStyles;
  };
}

export default withStyles;
