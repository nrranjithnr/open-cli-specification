import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  as?: React.ElementType;
}

/**
 * Responsive container component
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  className = '',
  as: Component = 'div',
}) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  return (
    <Component className={`container mx-auto px-4 ${sizeClasses[size]} ${className}`}>
      {children}
    </Component>
  );
};

export interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
  as?: React.ElementType;
}

/**
 * Flexible layout component for stacking elements
 */
export const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  as: Component = 'div',
}) => {
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';
  const spacingClasses = {
    xs: direction === 'row' ? 'gap-1' : 'space-y-1',
    sm: direction === 'row' ? 'gap-2' : 'space-y-2',
    md: direction === 'row' ? 'gap-4' : 'space-y-4',
    lg: direction === 'row' ? 'gap-6' : 'space-y-6',
    xl: direction === 'row' ? 'gap-8' : 'space-y-8',
  };
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <Component
      className={`flex ${directionClass} ${spacingClasses[spacing]} ${alignClasses[align]} ${
        justifyClasses[justify]
      } ${wrap ? 'flex-wrap' : ''} ${className}`}
    >
      {children}
    </Component>
  );
};

export interface BoxProps {
  children: React.ReactNode;
  p?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  px?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  py?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  m?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  mx?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  my?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  bg?: 'primary' | 'secondary' | 'surface' | 'transparent';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  className?: string;
  as?: React.ElementType;
}

/**
 * Box component with common styling props
 */
export const Box: React.FC<BoxProps> = ({
  children,
  p,
  px,
  py,
  m,
  mx,
  my,
  bg,
  rounded = 'none',
  shadow = 'none',
  border = false,
  className = '',
  as: Component = 'div',
}) => {
  const paddingClasses = {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };
  const paddingXClasses = {
    xs: 'px-1',
    sm: 'px-2',
    md: 'px-4',
    lg: 'px-6',
    xl: 'px-8',
  };
  const paddingYClasses = {
    xs: 'py-1',
    sm: 'py-2',
    md: 'py-4',
    lg: 'py-6',
    xl: 'py-8',
  };
  const marginClasses = {
    xs: 'm-1',
    sm: 'm-2',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
  };
  const marginXClasses = {
    xs: 'mx-1',
    sm: 'mx-2',
    md: 'mx-4',
    lg: 'mx-6',
    xl: 'mx-8',
  };
  const marginYClasses = {
    xs: 'my-1',
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
    xl: 'my-8',
  };
  const bgClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    surface: 'bg-surface',
    transparent: 'bg-transparent',
  };
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const classes = [
    p && paddingClasses[p],
    px && paddingXClasses[px],
    py && paddingYClasses[py],
    m && marginClasses[m],
    mx && marginXClasses[mx],
    my && marginYClasses[my],
    bg && bgClasses[bg],
    roundedClasses[rounded],
    shadowClasses[shadow],
    border && 'border border-gray-200',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};

export interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'inherit';
  align?: 'left' | 'center' | 'right';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  className?: string;
  as?: React.ElementType;
}

/**
 * Text component with typography utilities
 */
export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'inherit',
  align = 'left',
  transform = 'none',
  className = '',
  as: Component = 'span',
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
  };
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  const colorClasses = {
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    muted: 'text-muted',
    inherit: '',
  };
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  const transformClasses = {
    none: '',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
  };

  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    transformClasses[transform],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};
