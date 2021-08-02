import { ChangeEvent } from "react";
import "../styles/Input.css";

type InputProps = {
  value: any;
  id: string;
  placeholder: string;
  label: string;
  type?: string;
  onChange: (e: ChangeEvent<any>) => void;
  error?: string;
};

const Input = ({
  value,
  id,
  placeholder,
  label,
  type,
  onChange,
  error,
}: InputProps) => {
  return (
    <div className={`form-control${error ? " error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
      />
      <span className="form-error">{error}</span>
    </div>
  );
};

export default Input;
