import React, { useContext } from "react";
import aesthetic, {
  CompiledStyleSheet,
  StyleSheetFactory,
  ThemeName,
  ThemeSheet
} from "aesthetic";
import hoistNonReactStatics from "hoist-non-react-statics";
import uuid from "uuid/v4";
import {
  StyledComponent,
  useStyles,
  WithStylesOptions,
  WithStylesWrappedProps,
  WithStylesWrapperProps
} from "aesthetic-react";

function mergeStyles(
  styles: CompiledStyleSheet | any,
  newStyles: CompiledStyleSheet | any
): CompiledStyleSheet {
  const finalStyles: any = styles;

  Object.keys(newStyles).forEach(k => {
    if (!finalStyles[k]) {
      finalStyles[k] = newStyles[k];
    } else {
      finalStyles[k]._name = newStyles[k]._name;
      finalStyles[k]._definition = {
        ...finalStyles[k]._definition,
        ...newStyles[k]._definition
      };
    }
  });
  return finalStyles;
}

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
    WrappedComponent: React.ComponentType<Props & WithStylesWrappedProps<Theme>>
  ): StyledComponent<Props & WithStylesWrapperProps> {
    const baseName = WrappedComponent.displayName || WrappedComponent.name;
    const styleName = `${baseName}-${uuid()}`;

    // We must register earlier so that extending styles works correctly
    aesthetic.registerStyleSheet(styleName, styleSheet, extendFrom);

    const WithStyles = function WithStyles({
      wrappedRef,
      newstyles,
      ...props
    }: Props & WithStylesWrapperProps & { newstyles: typeof styles }) {
      const themeName = useContext(React.createContext<ThemeName>(""));
      const [styles, cx] = useStyles(() => ({
        ...aesthetic.getStyleSheet(styleName, "default_theme"),
        ...styleSheet
      }));
      const extraProps: WithStylesWrappedProps<Theme> & {
        newstyles?: typeof styles;
      } = {
        [cxPropName as "cx"]: cx,
        [stylesPropName as "styles"]: styles,
        ref: wrappedRef
      };

      if (passThemeProp) {
        extraProps[themePropName as "theme"] = aesthetic.getTheme(themeName);
      }

      if (newstyles) {
        const finalStyles = mergeStyles(extraProps.styles, newstyles);
        extraProps.newstyles = finalStyles;

        return (
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          <WrappedComponent {...props} {...extraProps} styles={finalStyles} />
        );
      }

      extraProps.newstyles = styles;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return <WrappedComponent {...props} {...extraProps} />;
    } as StyledComponent<Props & WithStylesWrapperProps>;

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
