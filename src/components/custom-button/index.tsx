import React from 'react';

import * as Styles from './styles';

interface CustomButtonProps {
  children?: string;
  startIcon: React.ReactNode;
  rest?: React.ReactNode;
  onClick?: () => void;
}
const CustomButton = ({ children, startIcon, onClick, ...rest }: CustomButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Styles.CustomButtonContainer {...rest} onClick={handleClick}>
      {startIcon && <Styles.IconContainer>{startIcon}</Styles.IconContainer>}

      {children}
    </Styles.CustomButtonContainer>
  );
};

export default CustomButton;
