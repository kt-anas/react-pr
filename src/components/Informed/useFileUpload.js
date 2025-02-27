import { useState } from "react";
import { useTranslation } from "react-i18next";

const useFileUpload = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage(t("fileTypeError"));
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage(t("fileSizeError"));
      return;
    }

    setErrorMessage("");
    setFile(selectedFile);
    console.log('Selected file:', selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return {
    file,
    previewUrl,
    errorMessage,
    handleFileChange,
  };
};

export default useFileUpload;
