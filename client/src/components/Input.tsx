import { ChangeEvent } from "react";
import { BsChevronDown } from "react-icons/bs";
import { AnimalSubtype, AnimalType } from "../entities/Animal";
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
  select?: typeof AnimalType | typeof AnimalSubtype;
  isDisabled?: boolean;
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
  select,
  isDisabled,
}: InputProps) => {
  return (
    <div className={`form-control${error ? " error" : ""}`}>
      <label htmlFor={id}>{`${label}${isRequired ? " *" : ""}`}</label>
      {isTextArea && (
        <textarea
          id={id}
          onChange={onChange}
          value={value}
          rows={3}
          disabled={isDisabled}
        />
      )}
      {select && (
        <div className="select">
          <select
            id={id}
            onChange={onChange}
            value={value}
            disabled={isDisabled}
          >
            <option value=""></option>
            {Object.values(select).map((option, i) => (
              <option key={id + i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <BsChevronDown size="14" />
        </div>
      )}
      {!isTextArea && !select && (
        <input
          id={id}
          placeholder={placeholder}
          type={type ? type : "text"}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
        />
      )}
      <span className="form-error">{error}</span>
    </div>
  );
};

export default Input;
