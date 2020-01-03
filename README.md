## CSS-in-JS

- [Styled Components](https://www.styled-components.com/)
  - Write normal CSS as a string, creates a styled component from a base component
- [Aphrodite](https://github.com/Khan/aphrodite)

  - Very similar to React Native's styles.
  - Support for server-side rendering, browser prefixing, and minimum CSS generation (to improve initial load time)

- [Emotion](https://emotion.sh/docs/introduction)

  - CSS as a string, inline

- [Styletron](https://www.styletron.org/)

  - Creates a styled component like _Styled Components_, but uses objects instead of strings

### Related tools

[react-with-styles](https://airbnb.io/projects/react-with-styles/) encapsulates some CSS-in-JS engines (Aphrodite, Radium, React Native, etc) so that they are not tightly coupled with the app code and can be exchanged in the future.
