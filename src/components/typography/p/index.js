import React from 'react';
import {Text} from 'react-native';
import {style} from '../style';

const P = props => {
  let variant = props.variant;
  let textStyle;

  switch (variant) {
    case 'bold':
      textStyle = style.bold;
      break;
    case 'italic':
      textStyle = style.italic;
      break;
    case 'bold-italic':
      textStyle = style.boldItalic;
      break;
    default:
      textStyle = style.regular;
      break;
  }

  return (
    <Text
      selectable={props.selectable ?? false}
      style={{...textStyle, ...props.style}}>
      {props.children}
    </Text>
  );
};

export default P;
