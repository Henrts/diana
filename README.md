## A Template Design System

The Diana System and component library. The purpose of this library is to be used as a foundation for a specific design system. It uses aphrodite and aesthetic under the hood.

### Installation

### Usage

The base building blocks of the library are the HOC `withStyles` and the hooks `useStyles` and `useTheme`
Use `withStyles` to produce `StyledComponents` that can then be wrapped and extended with different styles and be parts.

![](https://raw.githubusercontent.com/Henrts/diana/master/src/stories/systemdiagram.png)

Use `initTheme` with the desired theme at the start of your application.

```javascript
import theme from "../src/tokens/themes/theme.example";

initTheme(theme);
```

#### Creation of an extendable component

```javascript
import { withStyles, WithStylesProps } from "@henrts/diana";

const styleSheet = theme => ({
  exampleStyle: {
    color: "black",
    fontSize: 23,
    margin: 16
  }
});
const ExampleComponent: React.FC<WithStylesProps> = ({
  cx,
  styles,
  children
}) => <div className={cx(styles.exampleStyle)}>{children}</div>;
export default withStyles(styleSheet)(ExampleComponent);
```

#### Extending a Component

```javascript
import { ExampleComponent } from "./ExampleComponent";

export const DerivedComponent = ExampleComponent.extendStyles(theme => ({
  exampleStyle: {
    /* style override */
    fontSize: 12
  }
}));
```

### Publish

Lerna will publish each package based on changes that happened since last release. For that we can run the following command that'll publish the packages and update others that has them as dependencies inside @diana-ui scope.

```shell
  $ npx lerna publish
```

> Note: if you already have lerna installed globally you can omit _npx_

Before run it, be sure that all packages do not contain errors. Try exec the following command in order to check it:

```shell
  $ npx lerna run prepare
```

This will run prepare script on each component

### Using Commitizen

This repo uses commitizen to help with the commit structure. In order to use it just do as shown below:

```shell
  $ git add .
  $ yarn commit
  ...
```

### Scripts

> Generate Assets:

Looks into the `assets>icons` directory and does the necessary updates in order to get the new icons added to the types and tokens package.

```shell
  $ yarn generate:assets
```

> New Package:

Creates a new package based on the most common needed files. The package name does not need the @diana-ui prefix since it'll automatically be added.

```shell
  $ yarn new-package
```
