import React, { useMemo } from "react";
import aesthetic from "aesthetic";
import hoistNonReactStatics from "hoist-non-react-statics";
import uuid from "uuid/v4";
import deepMerge from "extend";
import {
  WithStylesProps,
  WithStylesOptions,
  ThemeSheet,
  ThemeStyleSheetFactory,
  Theme,
  AesStyleSheetFactory,
  ParentStylesheet,
  StyledParentStylesheet,
  WithStylesType
} from "@diana-ui/types";
import useStyles from "./useStyles";
import ComponentRegistry from "./Registry";

/**
 * Wrap a React component with an HOC that injects the defined style sheet as a prop.
 */
function withStyles<BaseTheme = Theme>(
  styleSheet: ThemeStyleSheetFactory<BaseTheme>,
  options: WithStylesOptions = {}
): WithStylesType<BaseTheme> {
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
    WrappedComponent: React.ComponentType<ParentStylesheet<Props, typeof styleSheet>>
  ): StyledParentStylesheet<Props, typeof styleSheet> {
    const baseName = WrappedComponent.displayName || WrappedComponent.name;
    const styleName = `${baseName}-${uuid()}`;

    // We must register earlier so that extending styles works correctly
    aesthetic.registerStyleSheet<BaseTheme>(
      styleName,
      styleSheet as AesStyleSheetFactory,
      extendFrom
    );

    const WithStyles: StyledParentStylesheet<Props, typeof styleSheet> = React.memo(
      function WithStyles(props: ParentStylesheet<Props, typeof styleSheet>) {
        const themeName: ThemeSheet = aesthetic.getTheme();
        const mergedStylesheet = deepMerge(
          true,
          {},
          aesthetic.getStyleSheet(styleName, themeName.name || "default_theme"),
          styleSheet(aesthetic.getTheme()),
          props.parentStylesheet ? props.parentStylesheet(aesthetic.getTheme()) : {}
        );

        const parentStylesheetMemo = useMemo(() => {
          return () => mergedStylesheet;
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

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

        extraProps.parentStylesheet = parentStylesheetMemo;
        return <WrappedComponent {...props} {...extraProps} />;
      }
    ) as StyledParentStylesheet<Props, typeof styleSheet>;

    hoistNonReactStatics(WithStyles, WrappedComponent);

    WithStyles.displayName = `withStyles(${baseName})`;

    WithStyles.styleName = styleName;

    WithStyles.WrappedComponent = WrappedComponent;

    // eslint-disable-next-line @typescript-eslint/unbound-method
    WithStyles.extendStyles = (
      customStyleSheet: ThemeStyleSheetFactory<BaseTheme>,
      extendOptions: WithStylesOptions = {}
    ) => {
      if (!extendable) {
        throw new Error(`${baseName} is not extendable.`);
      }

      return withStyles<BaseTheme>(customStyleSheet, {
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

export const withStylesHOC = <T extends unknown>() => (
  styleSheet: ThemeStyleSheetFactory<T>,
  options: WithStylesOptions = {}
): WithStylesType<T> => withStyles<T>(styleSheet, options);

export default withStyles;
