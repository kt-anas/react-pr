import React, { useState } from "react";
import { useField } from "informed";
import { FormGroup, FormLabel, FormControl, Image } from "react-bootstrap";

const MAX_FILE_SIZE = 3 * 1024 * 1024; 

const FileUploadField = ({ label, accept, required, ...props }) => {
  const validate = (value) => {
    if (!value) return required ? "This field is required" : undefined;
    if (value.size > MAX_FILE_SIZE) return "File size must be less than 3MB";
    return undefined;
  };

  const { fieldState, fieldApi, render } = useField({
    ...props,
    validate,
  });

  const [preview, setPreview] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      fieldApi.setValue(undefined);
      setPreview(null);
      setFileInfo(null);
      setFileURL(null);
      return;
    }

    const error = validate(file);
    fieldApi.setError(error);
    if (error) return;

    fieldApi.setValue(file);
    setFileInfo({ name: file.name, size: file.size, type: file.type });

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
      setFileURL(null);
    } else if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setFileURL(url);
      setPreview(null);
    } else {
      setFileURL(null);
      setPreview(null);
    }
  };

  return render(
    <FormGroup className="mb-3">
      <FormLabel className="fw-bold">
        {label} {required && <span className="text-danger">*</span>}
      </FormLabel>
      <FormControl
        type="file"
        accept={accept}
        onChange={handleChange}
        isInvalid={!!fieldState.error}
      />

      {fieldState.error && <div className="text-danger mt-1">{fieldState.error}</div>}

      {fileInfo && (
        <div className="mt-2">
          <p>
            <strong>File:</strong> {fileInfo.name} <br />
            <strong>Size:</strong> {(fileInfo.size / 1024).toFixed(2)} KB <br />
            <strong>Type:</strong> {fileInfo.type}
          </p>
        </div>
      )}

      {preview && (
        <div className="mt-2">
          <Image src={preview} alt="Preview" thumbnail width={150} />
        </div>
      )}

      {fileURL && (
        <div className="mt-2">
          <iframe src={fileURL} width="100%" height="400px"></iframe>
        </div>
      )}
    </FormGroup>
  );
};

export default FileUploadField;
