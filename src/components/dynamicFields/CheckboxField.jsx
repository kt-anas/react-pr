import React from "react";
import { useField } from "informed";

const CheckboxField = ({ label, options, validate, ...props }) => {
  const { fieldState, fieldApi, render, ref } = useField({ validate, ...props });

  return render(
    <div>
      {options && <p>{label}</p>}
      {options && fieldState.error && <div className="text-danger">{fieldState.error}</div>}
      {options ? (
        options.map((option) => (
          <div key={option.value}>
            <input
              type="checkbox"
              ref={ref}
              name={props.id}
              value={option.value}
              checked={(fieldState.value || []).includes(option.value)}
              onChange={(e) => {
                const checked = e.target.checked;
                const newValue = checked
                  ? [...(fieldState.value || []), option.value]
                  : (fieldState.value || []).filter((v) => v !== option.value);

                fieldApi.setValue(newValue);
              }}
            />
            <span>{option.label}</span>
          </div>
        ))
      ) : (
        <div>
          <input
            type="checkbox"
            ref={ref}
            checked={fieldState.value || false}
            onChange={(e) => fieldApi.setValue(e.target.checked)}
          />
          <span>{label}</span>
        </div>
      )}

       
      {!options && fieldState.error && <div className="text-danger">{fieldState.error}</div>}
    </div>
  );
};

export default CheckboxField;
