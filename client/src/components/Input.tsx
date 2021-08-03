import { ChangeEvent } from "react";
import "../styles/Input.css";

type InputProps = {
  value: any;
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  onChange: (e: ChangeEvent<any>) => void;
  error?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
};

const Input = ({
  value,
  id,
  placeholder,
  label,
  type,
  onChange,
  error,
  isRequired,
  isTextArea,
}: InputProps) => {
  return (
    <div className={`form-control${error ? " error" : ""}`}>
      <label htmlFor={id}>{`${label}${isRequired ? " *" : ""}`}</label>
      {isTextArea ? (
        <textarea id={id} onChange={onChange} value={value} rows={3} />
      ) : (
        <input
          id={id}
          placeholder={placeholder}
          type={type ? type : "text"}
          value={value}
          onChange={onChange}
        />
      )}
      <span className="form-error">{error}</span>
    </div>
  );
};

export default Input;
