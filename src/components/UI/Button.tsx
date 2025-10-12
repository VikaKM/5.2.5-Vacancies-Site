import {  Button } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';

type ButtonFormProps = ButtonProps & {
  children: React.ReactNode;
   onClick?: () => void;
};

export default function ButtonForm({
  children,
  style,
  ...props
 }: ButtonFormProps) {

  return (
    <Button 
        style={{ fontFamily: 'OpenSansMedium', ...style }}
        {...props}>
        {children}
    </Button>
  )
}
