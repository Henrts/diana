## @diana-ui/expandable-panel

### ExpandablePanel

The `ExpandablePanel` is very self-explanatory - it is a content panel that expands/collapses when clicked on.
Its expanded/collapsed state can either be controlled by the component internally or by a parent component.

### ExpandablePanels

`ExpandablePanel`s can be grouped in an `ExpandablePanels` component. Multiple `ExpandablePanel`s can be opened simultaneously by default.
However, if the `allowMultipleExpandedPanels` prop is passed as `false`, `ExpandablePanels` can mimic the behaviour of an Accordion, where expanding
one panel will collapse the other.
This component also passes other props to its children, e.g. `onClick` or `disabled`.
