export type CommonFieldProps = {
  name: string;
  label: string;
  className?: string;
  hideExceptInput?: boolean;
  placeholder?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
};

export type RadioOptions = { title: string; value: string }[];

export type RadioFieldProps = {
  options: RadioOptions;
} & CommonFieldProps;
