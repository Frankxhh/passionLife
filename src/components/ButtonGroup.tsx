'use client';

import { Button } from './ui/button';

interface ButtonGroupProps {
  buttons: {
    label: string;
    key: string;
  }[];
  time?: string;
  handleTimeChange: (time: string) => void;
}

// 单选button按钮
const ButtonGroup = ({ buttons, time, handleTimeChange }: ButtonGroupProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {buttons.map(button => (
        <Button
          variant={time === button.key ? 'default' : 'secondary'}
          key={button.key}
          onClick={() => {
            handleTimeChange(button.key);
          }}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
};

export default ButtonGroup;
