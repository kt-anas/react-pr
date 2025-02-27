import React from "react";
import Select from "react-select";

const ReactSelect = ({
  items,
  onChange,
  value,
  isInvalid,
  feedbackInvalid,
}) => {
  const options = items.map((item) => ({ value: item, label: item }));

  return (
    <div>
      <Select
        options={options}
        onChange={(selectedOption) => onChange(selectedOption.value)}
        value={options.find((option) => option.value === value)}
      />
      {isInvalid && (
        <div className="invalid-feedback d-block">{feedbackInvalid}</div>
      )}
    </div>
  );
};

export default ReactSelect;
