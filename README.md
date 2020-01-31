# @vdegenne/mwc-forms-util

A set of convenient methods for manipulating forms using @material elements.

> Work still in Progress
> Please don't hesitate to make some Pull Request to improve this module.

## Installation

```bash
npm i @vdegenne/mwc-forms-util
```

Then in your code

```javascript
import { ... } from '@vdegenne/mwc-forms-util';
```

*(Note: You can use this same line for TypeScript project, the typings are already included in the package).*

You can also include this package directly in your html

```html
<script type="module" src="/node_modules/@vdegenne/mwc-forms-util/util.js"></script>
```

If you have a node module path resolver server then you can just type

```html
<script type="module" src="@vdegenne/mwc-forms-util"></script>
```

## Usage

### validateForm

```javascript
if (!validateForm(formElement)) {
  console.log('something went wrong');
}
else {
  // continue
}
```

This function will also report the validity and the user-defined helper will be triggered (e.g. `mwc-textfield` will becomes red if it was required but the field is empty).

### serializeForm

Digests an object `{name: value}` representing the form.

```javascript
const object = serializeForm(formElement);
```

### fillForm

```javascript
const object = {
  name: 'Martin',
  age: 32,
  phone: '123-456
};

fillForm(formElement, object);
```

### resetForm(formElement)

Resets the form element.