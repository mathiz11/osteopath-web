import { ChangeEvent } from "react";
import { BsChevronDown, BsStar, BsStarFill } from "react-icons/bs";
import { AnimalSubtype, AnimalType } from "../entities/Animal";
import "../styles/Input.css";
import FileInput from "./FileInput";

type InputProps = {
  value: any;
  id: string;
  placeholder?: string;
  label: string;
  type?: string;
  onChange?: (e: ChangeEvent<any>) => void;
  error?: string;
  isRequired?: boolean;
  isTextArea?: boolean;
  select?: typeof AnimalType | typeof AnimalSubtype;
  isDisabled?: boolean;
  isSwitch?: boolean;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  isNote?: boolean;
  isFile?: boolean;
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
  isSwitch,
  setFieldValue,
  isNote,
  isFile,
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
      {isSwitch && setFieldValue && (
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => setFieldValue(id, !value)}
            checked={value}
          />
          <span className="slider"></span>
        </label>
      )}
      {isNote && setFieldValue && (
        <div className="note">
          {[1, 2, 3, 4, 5].map((i) =>
            i <= value ? (
              <BsStarFill
                key={`emptyStar${i}`}
                onClick={() => setFieldValue(id, i)}
                size="32"
              />
            ) : (
              <BsStar
                key={`start${i}`}
                onClick={() => setFieldValue(id, i)}
                size="32"
              />
            )
          )}
        </div>
      )}
      {isFile && setFieldValue && (
        <FileInput id={id} file={value} setFieldValue={setFieldValue} />
      )}
      {!isTextArea && !select && !isSwitch && !isNote && !isFile && (
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
