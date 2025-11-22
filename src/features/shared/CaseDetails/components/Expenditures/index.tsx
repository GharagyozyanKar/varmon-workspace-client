import styles from './styles.module.scss'
import { customFieldSx } from '../../../../../styles/customSx'
import TextField from '@mui/material/TextField'
import { IoMdAdd } from "react-icons/io";
import Button from '@mui/material/Button'
import type { Expenditure } from '../../../../../types';
import { useEffect, useState } from 'react';
import { addExpenditure, deleteExpenditure, getExpendituresByCaseId } from '../../../../../api/expenditures';
import { FaMinus } from "react-icons/fa";

interface IProps {
    caseId: string | number
}

const Expenditures = ({ caseId }: IProps) => {
    const [data, setData] = useState<Partial<Expenditure>>({ description: "", amount: 0 })
    const [total, setTotal] = useState<number>(0)
    const [expenditures, setExpenditures] = useState<Expenditure[]>([])
    const [amountError, setAmountError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);


    useEffect(() => {
        getExpendituresByCaseId(caseId)
            .then(res => {
                const data = res.payload as Expenditure[]
                setExpenditures(data)
                setTotal(data.reduce((acc, item) => acc + Number(item.amount), 0))
            })
    }, [caseId])


    const handleAdd = () => {
        if (data.description !== "" && (data.amount as number) > 0) {
            addExpenditure(caseId, data)
                .then(res => {
                    const data = res.payload as Expenditure
                    setExpenditures(prev => [data, ...prev])
                    setTotal(prev => prev + (+data.amount))
                    setData({ description: "", amount: 0 })
                })
            setDescriptionError(false);
            setAmountError(false);
        } else {
            if (data.description === '') {
                setDescriptionError(true);
            } 

            if ((data.amount as number) <= 0) {
                setAmountError(true);
            }
        }
    }

    const handleDelete = (id: string | number) => {
        deleteExpenditure(id)
            .then(res => {
                setExpenditures(prev => prev.filter(item => item.id !== id))
                setTotal(prev => prev - (+(res.payload as Expenditure).amount))
            })
            .catch(console.log)
    }

    const handleChange = (expenditureType: string, value: string | number) => {
        setData((prev) => ({ ...prev, [expenditureType]: value }))
        if (expenditureType === 'description') {
            setDescriptionError(false);
        } else {
            setAmountError(false);
        }
    }

    return (
        <div className={styles.expenditures}>
            <span className={styles.title}>Ծախսեր</span>
            <div className={styles.expendituresList}>

                {
                    expenditures.length > 0 ?
                        <>
                            {
                                expenditures.map(item => (
                                    <div className={styles.expenditure} key={item.id}>
                                        <p>{item.description}</p>
                                        <div className={styles.amount}>
                                            <span>{item.amount}դր․</span>
                                        </div>

                                        <div className={styles.delete}>
                                            <FaMinus onClick={() => handleDelete(item.id)} />
                                        </div>

                                    </div>
                                ))
                            }

                        </>
                        :
                        <p className={styles.emptyList}>Ծախսեր չկան</p>
                }
            </div>
            <div className={styles.total}>
                <span>{total}դր</span>
            </div>
            <div className={styles.actions}>
                <TextField
                    type='text'
                    placeholder="Նկարագրություն"
                    multiline
                    size="small"
                    className={styles.description}
                    sx={customFieldSx}
                    value={data?.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    error={descriptionError}
                />
                <TextField
                    type="number"
                    placeholder="Գումար"
                    className={styles.amount}
                    size="small"
                    inputProps={{
                        min: 0,
                        step: 100
                    }}
                    sx={customFieldSx}
                    value={data?.amount}
                    onChange={(e) => handleChange('amount', e.target.value)}
                    error={amountError}
                />
                <Button
                    className={styles.btn}
                    size='small'
                    variant='outlined'
                    onClick={handleAdd}
                >
                    <IoMdAdd />
                </Button>
            </div>
        </div >
    )
}

export default Expenditures