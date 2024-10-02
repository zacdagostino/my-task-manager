interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
  }
  
  const SelectField = ({ label, value, onChange, options }: SelectFieldProps) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">{label}</label>
        <select
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded text-gray-700"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectField;
  