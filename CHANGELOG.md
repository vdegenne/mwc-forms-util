## 1.5.1

- added 'modifiers' parameter to `fillForm` method.  
    You can now map an object property to a specific label (e.g. `(..., { description: 'desc' })` means `label="description"` in the form is bound to `desc` property of the object)

## 1.5.0

- waiting the window load to initialize the module objects

## 1.4.0

- fix await after changing the value of a material input


## 1.3.0

- Add `resetTextInput` function to the module.

## 1.2.0

- Remove undesired async in `resetForm` function.

## 1.1.3

- Remove the material web components dependencies

## 1.1.2

- `fillForm` handle checkbox indetermination
- `resetForm` set checkboxes values to indeterminate

## 1.1.0

- `serializeForm` now includes indeterminate checkboxes property (set to `null` otherwise `true` or `false` checked or not)
