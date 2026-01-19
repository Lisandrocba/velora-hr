const Select = ({
  label,
  value,
  options,
  onChange,
  placeholder,
  className = "",
}) => {
  console.log(options);
  return (
    <div className={`flex flex-col gap-1 items-start ${className}`}>
      {label && (
        <label className="text-lg font-medium text-white">{label}</label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded p-2 text-sm border-gray-300 text-gray-900 w-48"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
