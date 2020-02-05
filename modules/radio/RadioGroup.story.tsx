import React, { useState } from 'react';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

interface IProps {
  hasError?: boolean;
  disabled?: boolean;
  name: string;
  selectedValue?: string;
}

const RadioGroupExample: React.FC<IProps> = ({
  name,
  selectedValue,
  ...props
}) => {
  const [selected, setSelected] = useState(selectedValue);

  return (
    <RadioGroup
      name={name}
      selectedValue={selected}
      onValueSelect={newSelectedValue => setSelected(newSelectedValue)}
      {...props}
    >
      <Radio value={`${name}1`} label="Example Radio 1" />
      <Radio value={`${name}2`} label="Example Radio 2" />
      <Radio value={`${name}3`} label="Example Radio 3" />
    </RadioGroup>
  );
};

export { RadioGroupExample };
