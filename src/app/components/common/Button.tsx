// src/components/Button.tsx

interface ButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
  }
  
  const Button = ({ onClick, className, children }: ButtonProps) => {
    return (
      <button onClick={onClick} className={`p-2 rounded ${className}`}>
        {children}
      </button>
    );
  };
  
  export default Button;
  