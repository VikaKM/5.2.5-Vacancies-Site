import { TextInput } from '@mantine/core';


type InputSearchProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftSection?: React.ReactNode;
  style?: React.CSSProperties;
  styles?: React.ComponentProps<typeof TextInput>['styles']; 
};

export default function InputSearch({
  placeholder,
  value,
  onChange,
  leftSection,
  style,
  styles 
 }: InputSearchProps) {

  return (
    <TextInput
      placeholder={placeholder}
      leftSection={leftSection}
      value={value}
      onChange={onChange}
      style={style}
      styles={styles}
      radius="md"
    />
  )
}
