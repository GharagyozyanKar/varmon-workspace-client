import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { deleteCase, getCaseById, getCaseFiles, updateCase } from "../../../api/case";
import { type Case, type CaseStatus, type FileInfo } from "../../../types";
import { DataGrid, Expenditures, FileItem, Notes } from "./components";
import { displayDataAdmin, displayDataUser } from "./consts";
import { customButtonSx } from "../../../styles/customSx";
import Button from "@mui/material/Button";
import { createPortal } from "react-dom";
import { FilePicker, ConfirmModal, StatusButton, AssignmentField } from "../../../components";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppSelector } from "../../../store/hooks";
import { transformValue } from "../../../helpers/transformFieldValue";


const CaseDetails = () => {
    const userRole = useAppSelector(state => state.auth.user)?.role;
    const [caseData, setCaseData] = useState<Case>({} as Case);
    const [originalData, setOriginalData] = useState<Case>({} as Case)
    const [caseFiles, setCaseFiles] = useState<FileInfo[]>([])
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const [updateLoading, setUpdateLoading] = useState<boolean>(false)
    const [dataLoading, setDataLoading] = useState<boolean>(true)


    const { id } = useParams();
    const isEdited = JSON.stringify(caseData) === JSON.stringify(originalData)
    const navigate = useNavigate()

    useEffect(() => {
        getCaseById(id as string)
            .then((res) => {
                setCaseData(res.payload as Case)
                setOriginalData(res.payload as Case)
                return getCaseFiles(id as string)
            })
            .then((res) => {
                setCaseFiles(res.payload as FileInfo[])
            })
            .catch(console.error)
            .finally(() => {
                setDataLoading(false)
            })
    }, [id]);


    const handleFieldChange = (field: keyof Case, value: string | number | boolean) => {
        if (value === "true" || value === "false") {
            value = JSON.parse(value);
        }
        setCaseData((prev) => (prev ? { ...prev, [field]: value } : prev));
    };


    const handleUpdate = () => {
        setUpdateLoading(true)
        updateCase(id as string, caseData)
            .then(res => {
                setOriginalData(res.payload as Case)
                setCaseData(res.payload as Case)
            })
            .catch(() => {
                console.log("error")
            })
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const handleChangeStatus = (value: CaseStatus) => {
        setCaseData(prev => ({ ...prev, status: value }))
        setOriginalData(prev => ({ ...prev, status: value }))
    }

    const confirmDelete = () => {
        deleteCase(id as string)
            .then(() => {
                navigate("/admin/cases")
            })
            .catch(() => {
                console.log("error")
            })
    }

    return (
        <>
            {
                dataLoading ?
                    <div className={`${styles.loading} box`}>
                        <CircularProgress color="inherit" size={50} />
                    </div >
                    :
                    <div className={`${styles.wrapper} box`}>
                        <div className={styles.content}>
                            <div className={styles.caseHeader}>
                                <span className={styles.caseNumber}>Գործ։ {caseData.entryNumber}</span>
                                <div className={styles.statusWrapper}>
                                    {caseData.closed_at &&
                                        <span className={styles.closedAt}>
                                            {transformValue("closed_at", caseData.closed_at as string)}
                                        </span>
                                    }
                                    <StatusButton
                                        value={caseData.status}
                                        caseId={caseData.id}
                                        setStatus={handleChangeStatus}
                                    />
                                </div>
                            </div>
                            <div className={styles.mainInfo}>
                                <div className={styles.dataGrid}>
                                    <DataGrid
                                        data={userRole === "admin" ? displayDataAdmin : displayDataUser}
                                        caseData={caseData}
                                        onFieldChange={handleFieldChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.secondaryInfo}>
                                <div className={styles.expenditures}>
                                    <Expenditures caseId={id as string} />
                                </div>
                                {
                                    userRole === "admin" && (
                                        <div className={styles.assignedEmployee}>
                                            <AssignmentField handleFieldChange={handleFieldChange} caseData={caseData} />
                                        </div>
                                    )
                                }

                            </div>
                            <div className={styles.notes}>
                                <Notes caseId={id as string} />
                            </div>

                            <div className={styles.files}>
                                <div className={styles.filesHeader}>
                                    <span className={`${styles.fileUploaderTitle} title`}>
                                        Փաստաթղթեր
                                    </span>
                                </div>
                                <div className={styles.filesContent}>
                                    <div className={styles.fileUploader}>
                                        <span className={`${styles.filesTitle}`}> Ավելացնել Ֆայլ</span>
                                        <FilePicker caseId={id as string} caseNumber={caseData.caseNumber} setCaseFiles={setCaseFiles} />
                                    </div>
                                    <div className={styles.caseFiles}>
                                        {
                                            caseFiles.length > 0 ? (
                                                caseFiles.map((file) => (
                                                    <FileItem file={file} key={file.id} setCaseFiles={setCaseFiles} />
                                                ))
                                            ) : (
                                                <span className={`${styles.filesTitle}`}>Կցված ֆայլեր չկան</span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className={styles.caseFooter}>
                                {
                                    userRole === "admin" && (
                                        <Button
                                            className={styles.editBtn}
                                            variant="contained"
                                            color="error"
                                            sx={{ textTransform: 'none' }}
                                            onClick={() => setConfirmModal(true)}
                                        >
                                            Հեռացնել
                                        </Button>
                                    )
                                }
                                <Button
                                    className={styles.editBtn}
                                    sx={customButtonSx}
                                    variant="contained"
                                    disabled={isEdited}
                                    onClick={handleUpdate}
                                    loading={updateLoading}
                                >
                                    Պահպանել
                                </Button>
                            </div>
                        </div>


                        {createPortal(
                            <ConfirmModal
                                open={confirmModal}
                                onClose={setConfirmModal}
                                handleConfirm={confirmDelete}
                            />,
                            document.body
                        )}

                    </div>
            }
        </>


    );
};

export default CaseDetails;
