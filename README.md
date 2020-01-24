## Y Design

The Y design system and component library. This purpose of this library is to be used as a foundation of a specific design system. It uses aphrodite and aesthetic under the hood.

### Installation

### Usage

The base building blocks of the library are the HOC `withStyles` and the hooks `useStyles` and `useTheme`
Use `withStyles` to produce `StyledComponents` that can then be wrapped and extended with different styles and be parts.

![](https://raw.githubusercontent.com/Henrts/y-design/master/src/stories/systemdiagram.png)

Use `initTheme` with the desired theme at the start of your application.

```javascript
import theme from "../src/tokens/themes/theme.example";

initTheme(theme);
```

#### Creation of an extendable component

```javascript
import { withStyles, WithStylesProps } from "@Henrts/ydesign";

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
