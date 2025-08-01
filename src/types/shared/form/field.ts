export type CommonFieldProps = {
  name: string;
  label: string;
  className?: string;
  hideExceptInput?: boolean;
  placeholder?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
};

export type RadioOption = { title: string; value: string };
export type CheckBoxOption = RadioOption;

export type RadioFieldProps = {
  options: RadioOption[];
} & CommonFieldProps;

export type CheckBoxesFieldProps = {
  options: CheckBoxOption[];
} & Omit<CommonFieldProps, "placeholder" | "icon">;
