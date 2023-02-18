import React, { forwardRef } from 'react';

type ButtonProps = React.HTMLProps<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { type: _type, children, ...restProps } = props;
  return (
    <button
      type="button"
      ref={ref}
      className="rounded-md bg-slate-50 p-2 hover:bg-slate-100"
      {...restProps}
    >
      {children}
    </button>
  );
});
Button.displayName = 'Button';

export default Button;
