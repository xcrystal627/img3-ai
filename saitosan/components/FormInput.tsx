import React from 'react';
import InputError from './InputError';
import Label from './Label';

interface Props {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

function FormInput({ label, error, children }: Props) {
  return (
    <div className="w-full">
      {label && <Label>{label}</Label>}
      {children}
      {error && <InputError error={error} />}
    </div>
  );
}

export default FormInput;
