interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
  }
  
  const InputField = ({ label, type, value, onChange, placeholder }: InputFieldProps) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded text-gray-700"
        />
      </div>
    );
  };
  
  export default InputField;
  