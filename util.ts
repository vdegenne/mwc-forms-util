const TextField = customElements.get('mwc-textfield');
const TextArea = customElements.get('mwc-textarea');
const Checkbox = customElements.get('mwc-checkbox');
const Formfield = customElements.get('mwc-formfield');

export function getFormNodes(form: HTMLElement) {
  return form.querySelectorAll<HTMLInputElement>(
      'mwc-textfield, mwc-textarea, mwc-checkbox, select');
}


export function getFormInputs(form: HTMLElement) {
  let inputs: {[label: string]: HTMLInputElement} = {};

  for (const node of getFormNodes(form)) {
    if (node.hasAttribute('name') || node.hasAttribute('label')) {
      const name = node.getAttribute('name') || node.getAttribute('label');
      inputs[name!] = node;
    } else if (Checkbox && node instanceof Checkbox) {
      if (node.parentElement && Formfield &&
          node.parentElement instanceof Formfield &&
          (node.parentElement.hasAttribute('name') ||
           node.parentElement.hasAttribute('label'))) {
        const name = node.parentElement.getAttribute('name') ||
            node.parentElement.getAttribute('label');
        inputs[name!] = node;
      }
    }
  }
  return inputs;
}


export function validateForm(form: HTMLElement) {
  for (const node of getFormNodes(form)) {
    if (Checkbox && node instanceof Checkbox) {
      continue;  // ignore checkboxes
    }

    if (!node.checkValidity()) {
      node.reportValidity();
      return false;
    }
  }
  return true;
}


export function serializeForm(form: HTMLElement) {
  const inputs = getFormInputs(form);
  const values: any = {};
  for (const [label, element] of Object.entries(inputs)) {
    if ((TextField && element instanceof TextField) ||
        (TextArea && element instanceof TextArea)) {
      values[label] = element.value;
      if (element.type === 'number') {
        values[label] = parseFloat(values[label]) || null;
      }
    } else if (Checkbox && element instanceof Checkbox) {
      values[label] = !element.indeterminate ? element.checked : null;

    } else if (element instanceof HTMLSelectElement) {
      values[label] = element.value;
    }
  }
  return values;
}

export function fillForm(form: HTMLElement, object: any) {
  for (const [label, element] of Object.entries(getFormInputs(form))) {
    if (label in object) {
      if ((TextField && element instanceof TextField) ||
          (TextArea && element instanceof TextArea) ||
          element instanceof HTMLSelectElement) {
        element.value = object[label] || '';
      } else if (Checkbox && element instanceof Checkbox) {
        if (object[label] === true || object[label] === false) {
          element.indeterminate = false;
          element.checked = object[label];
        } else {
          element.indeterminate = true;
        }
      }
      // else if (element instanceof HTMLSelectElement) {
      //   element.value = object[label]
      // }
    }
  }
}


export async function resetForm(form: HTMLElement) {
  for (const node of getFormNodes(form)) {
    if (TextField && node instanceof TextField) {
      node.value = '';
    } else if (TextArea && node instanceof TextArea) {
      node.value = '';
      // resizeTextArea(node)
    } else if (Checkbox && node instanceof Checkbox) {
      node.indeterminate = true;
    } else if (node instanceof HTMLSelectElement) {
      node.value = '';
    }
  }
}


export function resizeTextArea(textarea: any) {
  if (!TextArea || !(textarea instanceof TextArea)) {
    return;
  }
  const nlcount = (textarea.value.match(/\n/g) || []).length;
  textarea.rows = nlcount + 1;
}
