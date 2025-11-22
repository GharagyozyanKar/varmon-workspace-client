export const customFieldSx = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#D2D6D9' },
    '&:hover fieldset': { borderColor: '#93C5FD' },
    '&.Mui-focused fieldset': { borderColor: '#60A5FA' },
    '&.Mui-error fieldset': { borderColor: '#F87171' },
  },
  '& .MuiInputLabel-root': {
    color: '#8B909D',
    fontSize: '14px', 
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#60A5FA' },
  '& .MuiInputLabel-root.Mui-error': { color: '#F87171' },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-20px',
    left: 0,
    fontSize: '12px', 
  },
  '& .MuiFormHelperText-root.Mui-error': { color: '#F87171' },

  '& .MuiInputBase-input': {
    fontSize: '14px', 
  },

  '& input:-webkit-autofill': {
    WebkitTextFillColor: '#000',
    transition: 'background-color 5000s ease-in-out',
  },
};

export const customDateFieldSx = {
  ...customFieldSx,
  '& input': {
    fontSize: '14px',
  },
};

export const customFieldSxStandard = {
  '& .MuiInput-root': {
    '&:before': {
      borderBottom: '1px solid #D2D6D9', // default underline
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #93C5FD', // hover underline
    },
    '&.Mui-focused:after': {
      borderBottom: '2px solid #60A5FA', // focus underline
    },
  },
  '& .MuiInputLabel-root': {
    color: '#8B909D', // default label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#60A5FA', // focused label
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-20px',
    left: 0,
  },
};
export const customFieldSxFilled = {
  '& .MuiFilledInput-root': {
    backgroundColor: '#D9EAFE', // white background
    borderRadius: '4px',
    '&:before': {
      borderBottom: '1px solid #D2D6D9', // default underline
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #93C5FD', // hover underline
    },
    '&.Mui-focused:after': {
      borderBottom: '2px solid #60A5FA', // focus underline
    },
  },
  '& .MuiInputLabel-root': {
    color: '#8B909D', // default label
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#60A5FA', // focus label
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-20px',
    left: 0,
  },
  '& textarea': {
    color: '#1F2937', // text color inside multiline
  },
};





export const customButtonSx = {
  backgroundColor: '#60A5FA',
  // color: '#F7FBFF',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#318bf8ff',
  },
};



export const customOutlinedButtonSx = {
  textTransform: 'none',
  color: '#60A5FA',             // text color
  borderColor: '#60A5FA',       // border color
  backgroundColor: 'transparent', // keep it outlined
  '&:hover': {
    backgroundColor: '#E0F2FE', // light blue hover background
    borderColor: '#318BF8',     // border on hover
    color: '#318BF8',           // text color on hover
  },
};


export const customMenuSx = {
  "& .MuiPaper-root": {
    backgroundColor: "#F7FBFF",
    minWidth: "100px",
    borderRadius: "8px",
    borderTopRightRadius: 0,
  },
  "& .MuiMenuItem-root": {
    color: "#1E3A8A",
    fontSize: "14px",
    padding: "8px 15px",
    minHeight: "auto",
  },
}
export const customSelectSx = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#D2D6D9',
    },
    '&:hover fieldset': {
      borderColor: '#93C5FD',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#60A5FA',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#8B909D',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#60A5FA',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-20px',
    left: 0,
  },
  // dropdown arrow color
  '& .MuiSvgIcon-root': {
    color: '#8B909D',
  },
  '&.Mui-focused .MuiSvgIcon-root': {
    color: '#60A5FA',
  },
};


export const customCheckboxSx = {
  '& .MuiSvgIcon-root': {
    color: '#D2D6D9', // default border color
  },
  '&:hover .MuiSvgIcon-root': {
    color: '#93C5FD', // hover border color
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    color: '#60A5FA', // checked color
  },
  '& .MuiFormControlLabel-label': {
    color: '#8B909D', // default label color
  },
};

export const customAccordionSx = {
  backgroundColor: '#F7FBFF',
  boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
};

export const customAccordionSummarySx = {
  fontWeight: 700,
  color: '#1E3A8A',
};