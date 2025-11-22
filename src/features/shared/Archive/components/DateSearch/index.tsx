import { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { customDateFieldSx } from '../../../../../styles/customSx'
import { MdClear } from 'react-icons/md'

interface IProps {
    handleDateChange: (dateRange: { startDate?: string; endDate?: string }) => void
}

const DateSearch = ({ handleDateChange }: IProps) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setStartDate(value);
        handleDateChange({ startDate: value, endDate });
    };

    const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setEndDate(value);
        handleDateChange({ startDate, endDate: value });
    };

    const handleClearFilter = () => {
        setStartDate('');
        setEndDate('');
        handleDateChange({ startDate: undefined, endDate: undefined });
    };

    useEffect(() => {
        if (startDate && endDate) {
            handleDateChange({
                startDate: startDate ? new Date(startDate).toISOString() : undefined,
                endDate: endDate ? new Date(endDate).toISOString() : undefined
            });
        }
    }, [startDate, endDate]);

    return (
        <div className={styles.date_search}>
            <TextField
                label="Սկիզբ"
                type="date"
                variant="outlined"
                size="small"
                value={startDate}
                onChange={handleStartDateChange}
                sx={customDateFieldSx}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="Վերջ"
                type="date"
                variant="outlined"
                size="small"
                value={endDate}
                onChange={handleEndDateChange}
                sx={customDateFieldSx}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            {(startDate || endDate) && (
                <Tooltip title="Մաքրել" arrow placement="top">
                    <IconButton
                        className={styles.clearBtn}
                        onClick={handleClearFilter}
                        size="small"
                        sx={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                color: 'rgba(0, 0, 0, 0.8)',
                            },
                        }}
                    >
                        <MdClear size={18} />
                    </IconButton>
                </Tooltip>
            )}
        </div>
    )
}

export default DateSearch