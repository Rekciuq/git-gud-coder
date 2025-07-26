export type CommonFieldProps = {
  name: string;
  label: string;
  className?: string;
};

export type RadioOptions = { title: string; value: string }[];

export type RadioFieldProps = {
  options: RadioOptions;
} & CommonFieldProps;
