## @diana-ui/card

The `Card` component is merely a wrapper for the different Card components.
it is advisable to pass only those components (`CardHeader`, `CardBody`, `CardFooter`) as children, even though
you can still pass whatever you please as seen in the example below.
A valid example for a different component would be for instance a `Divider`.

The `CardHeader` can contain both the `Card`'s title and subtitle.
It also supports having either a label or an icon on the top right corner.

The `CardBody` serves as the wrapper for the `Card`'s main content wrapper.

The `CardFooter` contains mainly actionable elements like buttons or links.
