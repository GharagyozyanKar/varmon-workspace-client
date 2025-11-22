import Button from "@mui/material/Button";
import styles from "./styles.module.scss";
import { customButtonSx, customOutlinedButtonSx } from "../../styles/customSx";
import { MdUpload } from "react-icons/md";
import { useState, type Dispatch, type SetStateAction } from "react";
import { MdAttachFile } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Divider from "@mui/material/Divider";
import { uploadFile } from "../../api/case";
import LinearProgress from "@mui/material/LinearProgress";
import type { FileInfo } from "../../types";

interface IProps {
  caseId: string | number;
  caseNumber: string;
  setCaseFiles: Dispatch<SetStateAction<FileInfo[]>>;
}

const FilePicker = ({ caseId, caseNumber, setCaseFiles }: IProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);


  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caseNumber", caseNumber);

      try {
        setUploading(true);
        setProgress(0);

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev === null) return 0;
            return Math.min(prev + Math.random() * 10, 95); 
          });
        }, 400);

        const res = await uploadFile(formData, caseId, setProgress);
        if (res.status === "ok") {
          setCaseFiles((prev) => [...prev, res.payload as FileInfo]);
        }
     
        clearInterval(interval);
        setProgress(100);
      } catch (err) {
        console.error(err);
      } finally {
        setUploading(false);
        setProgress(null);
        setFile(null);
      }

    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    e.target.value = '';
  }


  return (
    <div className={styles.filePicker}>

      <div className={styles.actions}>
        <input
          type="file"
          onChange={handleChange}
          className={styles.fileInput}
        />

        <Button
          sx={customOutlinedButtonSx}
          variant="outlined"
          className={styles.selectFileButton}
          onClick={() => (document.querySelector(`.${styles.fileInput}`) as HTMLInputElement)?.click()}
        >
          Ընտրել ֆայլ
        </Button>

        <Button 
          sx={customButtonSx} 
          variant="contained" 
          onClick={handleUpload} 
          disabled={!file}
          loading={uploading}
        >
          <MdUpload size={20} />
        </Button>
      </div>
      <Divider />
      <div className={styles.filePreview}>
        {file ? (
          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <MdAttachFile className={styles.fileIcon} />
              <span>{file.name}</span>
            </div>
            <IoClose className={styles.closeIcon} onClick={() => setFile(null)} />
          </div>
        ) : (
          <div className={styles.fileItem}>
            <div className={styles.fileInfo}>
              <span className={styles.placeholder}>Ֆայլ չի ընտրվել</span>
            </div>
          </div>
        )}
        {uploading && (
          <div className={styles.progress}>
            <LinearProgress variant="determinate" value={progress ?? 0} />
          </div>
        )}
      </div>
    </div>
  )
}

export default FilePicker;