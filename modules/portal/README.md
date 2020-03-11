## @diana-ui/portal

The Portal component uses <a href="https://reactjs.org/docs/portals.html">React Portals</a> to render
a DOM element outside the DOM hierarchy of the parent element, namely as a child of the `<body>`.

This component was implemented for the `Popover` to be able to visibly overflow out of parents that have `overflow-hidden`.
An example of this can be found when a `Dropdown` (that used the `Popover`) is rendered inside a `Modal`.

The `Portal` is absolutely positioned, just below its parent element and aligned on the left side. To calculate this position,
the parent element's position is used via the `parentRef` prop.
