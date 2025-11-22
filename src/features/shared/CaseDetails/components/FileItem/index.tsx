import styles from "./styles.module.scss"
import type { FileInfo } from "../../../../../../src/types"
import { MdDelete, MdDownload } from "react-icons/md";
import { deleteFile, downloadFile } from "../../../../../../src/api/case";
import { useState, type Dispatch, type SetStateAction } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface IProps {
    file: FileInfo
    setCaseFiles: Dispatch<SetStateAction<FileInfo[]>>
}


const FileItem = ({ file, setCaseFiles }: IProps) => {
    const [loading, setLoading] = useState<boolean>(false)


    const handleDelete = () => {
        setLoading(true)
        deleteFile(file.id)
            .then(() => {
                setCaseFiles(prev => {
                    return prev.filter(item => item.id !== file.id)
                })
            })
            .catch(console.log)
            .finally(() => {
                setLoading(false)
            })
    }

    const handleDownload = () => {
        downloadFile(file.id)
            .then(() => {
                console.log("Ֆայլը ներբեռնված է")
            })
    }

    return (
        <div className={`${styles.fileItem} ${loading ? styles.loadingItem : ""}`} key={file.id}>
            <span className={styles.fileName}>{file.filename}</span>
            <div className={styles.actions}>
                {
                    !loading ? <>
                        <div className={styles.download}>
                            <MdDownload className={styles.downloadIcon} onClick={handleDownload} />
                        </div>
                        <div className={styles.delete}>
                            <MdDelete className={styles.deleteIcon} onClick={handleDelete} />
                        </div>
                    </>
                    :
                    <CircularProgress color="inherit" size={20}/>
                }
            </div>
        </div>
    )
}

export default FileItem