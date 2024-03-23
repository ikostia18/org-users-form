import React from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SelectItem } from '../../utils/types';
import { styled as muiStyled } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const StyledWrapper = muiStyled('div')<StyledWrapperProps>(({ theme, width }) => ({
  width: width || '100%',
  margin: theme.spacing(1),
}));

interface MultiSelectProps {
  items: SelectItem[];
  label: string;
  selectedItems: SelectItem[];
  onChange: (selectedItems: SelectItem[]) => void;
  width?: string;
}

interface StyledWrapperProps {
  width?: string;
}

// TODO: add the number of selected with the search option
// TODO: handle the performance issue of many users

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  label,
  selectedItems,
  onChange,
  width,
}) => {

  return (
    <StyledWrapper width={width}>
      <Autocomplete
        multiple
        options={items}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}

        renderOption={(props, option, { inputValue, selected }) => {
          const matches = match(option.label, inputValue, { insideWords: true });
          const parts = parse(option.label, matches);

          return (
            <li {...props}>
              <div>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {parts.map((part, index) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 900 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                ))}
              </div>
            </li>
          );
        }}

        value={selectedItems}
        onChange={(event, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField {...params} label={label} />
        )}
      />
    </StyledWrapper>
  );
};

export default MultiSelect;
