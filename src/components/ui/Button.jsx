import React from 'react'

// Reusable Button component with brand styling
// Supports both regular <button> and <Link> from react-router-dom
export default function Button({ 
  children, 
  variant = 'primary',      // 'primary', 'secondary', 'outline'
  size = 'md',              // 'sm', 'md', 'lg'
  disabled = false,
  className = '',
  as: Component = 'button', // button, Link, a, etc.
  ...props 
}) {
  // Variant styles (color/background)
  const variantStyles = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-brand-100 text-brand-600 hover:bg-brand-200',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50'
  }

  // Size styles (padding)
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  // Base styles
  const baseStyles = 'font-semibold rounded-md transition-all duration-200'
  const disabledStyles = disabled ? 'disabled:bg-gray-400 disabled:cursor-not-allowed opacity-50' : ''

  const allStyles = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${disabledStyles} ${className}`

  return (
    <Component 
      className={allStyles}
      disabled={disabled}
      {...props}
    >
      {children}
    </Component>
  )
}
