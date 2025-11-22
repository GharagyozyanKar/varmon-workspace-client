import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import styles from './styles.module.scss'
import { customFieldSx } from '../../../../../styles/customSx'
import { IoIosSearch } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";

import { useState } from 'react'

interface IProps {
  handleSearch: (value: string) => void
}

const SearchField = ({ handleSearch }: IProps) => {
  const [searchValue, setSearchValue] = useState('');

  
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (value === '') {
      handleSearch('');
    }
  }

  const onSearchClick = () => {
    handleSearch(searchValue);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue);
    }
  };

  return (
    <div className={styles.search}>
      <TextField
        label="Որոնել"
        variant="outlined"
        fullWidth
        size="small"
        value={searchValue}
        onChange={handleOnChange}
        onKeyPress={onKeyPress}
        sx={customFieldSx}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={onSearchClick}
                edge="end"
                aria-label="search"
                sx={{
                  padding: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <IoIosSearch size={20} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Tooltip 
        title="Փնտրել: մուտքի համար, Դատ․ գործի համար, Հայցվոր, դատավոր, Պատասխանող"
        arrow
        placement="top"
      >
        <span
          className={styles.helperIcon}
          aria-label="search help"
        >
          <MdInfoOutline size={18} />
        </span>
      </Tooltip>
    </div>
  )
}

export default SearchField