import { ChangeEvent, useRef } from "react";
import { BsPlus, BsTrash } from "react-icons/bs";
import "../styles/FileInput.css";

type FileInputProps = {
  id: string;
  file: File | null;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

const FileInput = ({ id, file, setFieldValue }: FileInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) setFieldValue(id, file);
  };

  const removeFile = () => {
    if (ref.current?.value) {
      ref.current.value = "";
    }
    setFieldValue(id, null);
  };

  return (
    <div>
      <div className="file">
        <label className="secondary" htmlFor="file-input">
          <BsPlus size="20" />
          <span>Ajouter un fichier</span>
        </label>
        <input
          ref={ref}
          type="file"
          id="file-input"
          className={"file-input"}
          name="file-input"
          onChange={handleChange}
        />
        <span className="file-name">{file?.name}</span>
        {file && (
          <button className="circle" onClick={removeFile}>
            <BsTrash />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileInput;
