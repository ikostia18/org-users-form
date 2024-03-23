import { FC } from 'react';
import { Select, FormControl, InputLabel, MenuItem, Radio, SelectChangeEvent, Box } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { SelectItem } from '../../utils/types';

interface StyledFormControlProps {
    width?: string;
}

const StyledFormControl = muiStyled(FormControl)<StyledFormControlProps>(({ theme, width }) => ({
    width: width || '100%',
    margin: theme.spacing(1),
}));

interface CustomSelectProps {
    label: string;
    value: string;
    items: SelectItem[];
    onChange: (event: SelectChangeEvent) => void;
    width?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ label, value, items, onChange, width }) => {
    return (
        <StyledFormControl width={width}>
            <InputLabel id={`${label}-label`}>{'Organization'}</InputLabel>
            <Select
                labelId={`${label}-label`}
                id={`${label}-select`}
                value={value}
                label={'Organization'}
                onChange={onChange}
                renderValue={() => (
                    <Box sx={{ textAlign: 'left', width: '100%' }}>
                        {label}
                    </Box>
                )}
            >
                {items.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                        <Radio checked={value === org.id} />
                        {org.label}
                    </MenuItem>
                ))}
            </Select>
        </StyledFormControl>
    );
};

export default CustomSelect;