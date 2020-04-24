export declare function isMaterialElement(element: any): true | undefined;
export declare function getFormNodes(form: HTMLElement): NodeListOf<HTMLInputElement>;
export declare function getFormInputs(form: HTMLElement): {
    [label: string]: HTMLInputElement;
};
export declare function validateForm(form: HTMLElement): boolean;
export declare function serializeForm(form: HTMLElement): any;
export declare function fillForm(form: HTMLElement, object: any, modifiers?: {
    [label: string]: string;
}): void;
export declare function resetForm(form: HTMLElement): Promise<void>;
export declare function resizeTextArea(textarea: HTMLTextAreaElement): void;
export declare function resetTextInput(input: any): Promise<void>;
