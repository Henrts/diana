import React from "react";
import aesthetic from "aesthetic";
import hoistNonReactStatics from "hoist-non-react-statics";
import uuid from "uuid/v4";
import deepMerge from "extend";
import {
  ThemeStyleSheetFactory,
  WithStylesProps,
  WithStylesOptions,
  WithStylesWrapperProps,
  StyledComponent,
  ThemeSheet
} from "@diana-ui/types";
import useStyles from "./useStyles";
import ComponentRegistry from "./Registry";

/**
 * Wrap a React component with an HOC that injects the defined style sheet as a prop.
 */
function withStyles<Theme = ThemeSheet, T = unknown>(
  styleSheet: ThemeStyleSheetFactory<T>,
  options: WithStylesOptions = {}
) /* infer */ {
  const {
    cxPropName = aesthetic.options.cxPropName,
    extendable = true,
    extendFrom = "",
    passThemeProp = aesthetic.options.passThemeProp,
    stylesPropName = aesthetic.options.stylesPropName,
    themePropName = aesthetic.options.themePropName,
    register = false
  } = options;

  return function withStylesComposer<Props extends object = {}>(
    WrappedComponent: React.ComponentType<
      Props & WithStylesProps & { parentStylesheet?: typeof styleSheet }
    >
  ): StyledComponent<Props & WithStylesWrapperProps & { parentStylesheet?: typeof styleSheet }> {
    const baseName = WrappedComponent.displayName || WrappedComponent.name;
    const styleName = `${baseName}-${uuid()}`;

    // We must register earlier so that extending styles works correctly
    aesthetic.registerStyleSheet(styleName, styleSheet, extendFrom);

    const WithStyles = React.memo(function WithStyles(
      props: Props & WithStylesProps & { parentStylesheet: typeof styleSheet }
    ) {
      const themeName: ThemeSheet = aesthetic.getTheme();
      const mergedStylesheet = deepMerge(
        true,
        {},
        aesthetic.getStyleSheet(styleName, themeName.name || "default_theme"),
        styleSheet(aesthetic.getTheme()),
        props.parentStylesheet ? props.parentStylesheet(aesthetic.getTheme()) : {}
      );

      const [styles, cx] = useStyles(() => mergedStylesheet);

      const extraProps: WithStylesProps & {
        parentStylesheet?: typeof styleSheet;
      } = {
        [cxPropName as "cx"]: cx,
        [stylesPropName as "styles"]: styles
      };

      if (passThemeProp) {
        extraProps[themePropName as "theme"] = aesthetic.getTheme(themeName.name);
      }

      extraProps.parentStylesheet = styleSheet;
      return <WrappedComponent {...props} {...extraProps} />;
    }) as StyledComponent<
      Props &
        WithStylesWrapperProps & {
          parentStylesheet?: typeof styleSheet;
        }
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
        ...(extendOptions?.register === undefined ? { register: false } : {}),
        extendFrom: styleName
      })(WrappedComponent);
    };

    if (register) {
      ComponentRegistry.register(WithStyles, baseName);
    }

    return WithStyles;
  };
}

export default withStyles;
