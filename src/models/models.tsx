interface RadioItem {
  id: string;
  name: string;
  value: string;
  disabled?: boolean;
}

interface SchemaItem {
  type?: string;
  ref?: string;
  placeholder?: string;
  label?: string;
  name: string;
  disabled?: boolean;
  mask?: string;
}

export type {
  SchemaItem,
  RadioItem
}