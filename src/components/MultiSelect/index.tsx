import React, { useState } from 'react';
import { Autocomplete, AutocompleteRenderInputParams, AutocompleteRenderOptionState, Box, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { SelectItem } from '../../utils/types';
import { styled as muiStyled } from '@mui/material/styles';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import ListboxComponent, { StyledPopper } from './ListBoxItem';

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

const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  label,
  selectedItems,
  onChange,
  width,
}) => {

  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const renderInput = (params: AutocompleteRenderInputParams) => {
    return (
      <TextField
        {...params}
        label={'Users'}
        value={label}
        onChange={
          ({ target }) => {
            setIsTyping(target.value.length > 0);
          }
        } />
    );
  };

  const renderTags = (value: SelectItem[]) => {
    return (
      <Box sx={{ marginLeft: '10px' }}>
        {`${value.length} selected`} {isFocused || isTyping ? '|' : ''}
      </Box>
    );
  };

  const onChangeHandler = (newValue: SelectItem[]) => {
    onChange(newValue);

    setIsTyping(false);
    setIsFocused(false);
  };

  // *** 1st APPROACH AND MORE ELEGANT TO HANDLE PERFORMANCE ISSUES ***
  // const filterOptions = createFilterOptions({
  //   matchFrom: 'any',
  //   limit: 100,
  // });
  // + add props ot AutoComplete filterOptions={filterOptions}

  // *** 2nd APPROACH TO HANDLE PERFORMANCE ISSUES ***
  // *** IS TO USE REACT WINDOW (IMPLEMENTED IN ListboxComponent) ***
  // *** IS TO USE REACT WINDOW (IMPLEMENTED IN ListboxComponent) ***

  return (
    <StyledWrapper width={width}>
      <Autocomplete
        multiple
        options={items}
        disableCloseOnSelect
        getOptionLabel={(option) => option.label}

        ListboxComponent={ListboxComponent}
        PopperComponent={StyledPopper}

        // renderOption returns new type to handle the react-window adapter
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        renderOption={(props, option, { inputValue, index, selected }: AutocompleteRenderOptionState) => {
          const matches = match(option.label, inputValue, { insideWords: true });
          const parts = parse(option.label, matches);

          const optionToReturn = <li {...props}>
            <div>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                style={{ marginRight: 6 }}
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
          </li>;

          return [props, optionToReturn, index];

          // WITHOUT REACT WINDOW + REMOVE ListboxComponent & PopperComponent
          // return (
          //   <li {...props}>
          //     <div>
          //       <Checkbox
          //         icon={<CheckBoxOutlineBlankIcon />}
          //         checkedIcon={<CheckBoxIcon />}
          //         style={{ marginRight: 8 }}
          //         checked={selected}
          //       />
          //       {parts.map((part, index) => (
          //         <span
          //           key={index}
          //           style={{
          //             fontWeight: part.highlight ? 900 : 400,
          //           }}
          //         >
          //           {part.text}
          //         </span>
          //       ))}
          //     </div>
          //   </li>
          // );
        }}

        value={selectedItems}
        onChange={(_event, newValue) => onChangeHandler(newValue)}
        renderInput={renderInput}
        renderTags={renderTags}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </StyledWrapper>
  );
};

export default MultiSelect;
