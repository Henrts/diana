import React, { useContext } from "react";
import aesthetic, {
  StyleSheetFactory,
  ThemeName,
  ThemeSheet
} from "aesthetic";
import hoistNonReactStatics from "hoist-non-react-statics";
import uuid from "uuid/v4";
import deepMerge from "extend";
import {
  StyledComponent,
  useStyles,
  WithStylesOptions,
  WithStylesWrappedProps,
  WithStylesWrapperProps
} from "aesthetic-react";

/**
 * Wrap a React component with an HOC that injects the defined style sheet as a prop.
 */
function customWithStyles<Theme = ThemeSheet, T = unknown>(
  styleSheet: StyleSheetFactory<Theme, T>,
  options: WithStylesOptions = {}
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
    WrappedComponent: React.ComponentType<Props & WithStylesWrappedProps<Theme> & { parentStylesheet?: typeof styleSheet }>
  ): StyledComponent<Props & WithStylesWrapperProps & { parentStylesheet?: typeof styleSheet }> {
    const baseName = WrappedComponent.displayName || WrappedComponent.name;
    const styleName = `${baseName}-${uuid()}`;

    // We must register earlier so that extending styles works correctly
    aesthetic.registerStyleSheet(styleName, styleSheet, extendFrom);

    const WithStyles = function WithStyles({
      wrappedRef,
      ...props
    }: Props &
      WithStylesWrapperProps & { parentStylesheet: typeof styleSheet }) {
      const themeName = useContext(React.createContext<ThemeName>(""));
      const mergedStylesheet = deepMerge(
        true,
        {},
        aesthetic.getStyleSheet(styleName, themeName || "default_theme"),
        styleSheet(aesthetic.getTheme()),
        props.parentStylesheet ? props.parentStylesheet(aesthetic.getTheme()) : {}
      );

      const [styles, cx] = useStyles(() => mergedStylesheet);

      const extraProps: WithStylesWrappedProps<Theme> & {
        parentStylesheet?: typeof styleSheet;
      } = {
        [cxPropName as "cx"]: cx,
        [stylesPropName as "styles"]: styles,
        ref: wrappedRef
      };

      if (passThemeProp) {
        extraProps[themePropName as "theme"] = aesthetic.getTheme(themeName);
      }

      // @ts-ignore
      extraProps.parentStylesheet = styleSheet;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return <WrappedComponent {...props} {...extraProps} />;
    } as StyledComponent<Props & WithStylesWrapperProps & { parentStylesheet?: typeof styleSheet }>;

    hoistNonReactStatics(WithStyles, WrappedComponent);

    WithStyles.displayName = `withStyles(${baseName})`;

    WithStyles.styleName = styleName;

    WithStyles.WrappedComponent = WrappedComponent;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    WithStyles.extendStyles = (customStyleSheet, extendOptions) => {
      if (true) {
        if (!extendable) {
          throw new Error(`${baseName} is not extendable.`);
        }
      }

      return customWithStyles<Theme>(customStyleSheet, {
        ...options,
        ...extendOptions,
        extendFrom: styleName
      })(WrappedComponent);
    };

    return WithStyles;
  };
}

export default customWithStyles;
