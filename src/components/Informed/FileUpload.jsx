import { Upload } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./FileUpload.module.css";
import useFileUpload from "./useFileUpload";  

const FileUpload = ({ name, label, required, onChange }) => {
  const { t } = useTranslation();
  const { file, previewUrl, errorMessage, handleFileChange } = useFileUpload();

  
  const handleFileChangeWrapper = (e) => {
    handleFileChange(e);
    if (onChange && file) {
      onChange(file);  
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.uploadBox}>
        <label htmlFor={name} className={styles.uploadLabel}>
          <Upload className={styles.uploadIcon} />
          <span>{t("chooseFile")}</span>
          <input
            type="file"
            id={name}
            name={name}
            className={styles.fileInput}
            onChange={handleFileChangeWrapper} // Use the wrapper to call handleFileChange and onChange
            required={required}
            accept="image/*"
          />
        </label>
      </div>
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
      {previewUrl && <img src={previewUrl} alt="Preview" className={styles.previewImage} />}
    </div>
  );
};

export default FileUpload;
