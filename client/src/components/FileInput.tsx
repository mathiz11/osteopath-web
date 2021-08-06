import React, { ChangeEvent, useState } from "react";
import { BsPlus } from "react-icons/bs";
import "../styles/FileInput.css";

const FileInput = () => {
  const [file, setFile] = useState<File | null | undefined>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.item(0));
  };

  return (
    <div>
      <div className="file">
        <label className="secondary" htmlFor="file-input">
          <BsPlus size="20" />
          <span>Ajouter un fichier</span>
        </label>
        <input
          type="file"
          id="file-input"
          className={"file-input"}
          name="file-input"
          onChange={handleChange}
        />
        <span className="file-name">{file?.name}</span>
      </div>
    </div>
  );
};

export default FileInput;
