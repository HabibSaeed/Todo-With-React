import Button from '@mui/material/Button';
import React from 'react';

export default function Buttons(props) {
  let { value, trigger, colors, variant } = props;
  return (
    <Button variant={variant} onClick={trigger} color={colors}>
      {value}
    </Button>
  );
}
