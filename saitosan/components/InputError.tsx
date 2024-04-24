import React from 'react';
interface Props {
  error: string;
}
function InputError({ error }: Props) {
  return (
    <p
      className="text-sm text-red-600 mt-1"
      id="hs-validation-name-error-helper"
    >
      {error}
    </p>
  );
}

export default InputError;
