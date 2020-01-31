import {Checkbox} from '@material/mwc-checkbox';
import {Formfield} from '@material/mwc-formfield';
import {TextArea} from '@material/mwc-textarea';
import {TextField} from '@material/mwc-textfield';


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
    } else if (node instanceof Checkbox) {
      if (node.parentElement instanceof Formfield && (node.parentElement.hasAttribute('name')) || node.parentElement?.hasAttribute('label')) {
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
    if (node instanceof Checkbox) {
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
    if (element instanceof TextField || element instanceof TextArea) {
      values[label] = element.value;
      if (element.type === 'number') {
        values[label] = parseFloat(values[label]) || null;
      }
    } else if (element instanceof Checkbox) {
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
      if (element instanceof TextField || element instanceof TextArea ||
          element instanceof HTMLSelectElement) {
        element.value = object[label] || '';
      } else if (element instanceof Checkbox) {
        element.checked = object[label];
      }
      // else if (element instanceof HTMLSelectElement) {
      //   element.value = object[label]
      // }
    }
  }
}


export async function resetForm(form: HTMLElement) {
  for (const node of getFormNodes(form)) {
    if (node instanceof TextField) {
      node.value = '';
    } else if (node instanceof TextArea) {
      node.value = '';
      // resizeTextArea(node)
    } else if (node instanceof Checkbox) {
      // node.indeterminate = true
    } else if (node instanceof HTMLSelectElement) {
      node.value = '';
    }
  }
}


export function resizeTextArea(textarea: TextArea) {
  const nlcount = (textarea.value.match(/\n/g) || []).length;
  textarea.rows = nlcount + 1;
}