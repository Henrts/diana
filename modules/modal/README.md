## @diana-ui/modal

Modal component uses <a href="https://github.com/reactjs/react-modal">react-modal</a>.

Is divided into 3 possible children: ModalHeader, ModalBody and ModalFooter.

#### Modal Header

Used to apply Modal title, description, close button.

```jsx
<ModalHeader title="Title" description="Subtitle" />
```

It's possible to extend its styles by doing:

```jsx
import { ModalHeader as YModalHeader } from '@diana-ui/modal'

const ModalHeader = YModalHeader.extendStyles(theme => {
  // Header wrapper section
  header: {},
  // Whole title row section (without subtitle)
  titleWrapper: {},
  // Close icon
  closeIcon: {},
  // Icon behind title
  icon: {},
  // Title text
  title: {},
  // Subtitle text
  description: {}
})

```

#### Modal Body

Actual content for the Modal

```jsx
<ModalBody>Content</ModalBody>
```

It's possible to extend its styles by doing:

```jsx
import { ModalBody as YModalBody } from '@diana-ui/modal'

const ModalBody = YModalBody.extendStyles(theme => {
  // All body section
  body: {},
})

```

#### Modal Footer

Footer for the Modal. This will be mainly buttons.

```jsx
<ModalFooter>
  <BaseButton>Button 1</BaseButton>
  <BaseButton>Button 2</BaseButton>
</ModalFooter>
```

It's possible to extend its styles by doing:

```jsx
import { ModalFooter as YModalFooter } from '@diana-ui/modal'

const ModalFooter = YModalFooter.extendStyles(theme => {
  // All footer section
  footer: {},
})

```
