import * as React from 'react';
import { VariableSizeList, ListChildComponentProps } from 'react-window';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const LISTBOX_PADDING = 8;

export const StyledPopper = styled(Popper)({
    [`& .${autocompleteClasses.listbox}`]: {
        boxSizing: 'border-box',
        '& ul': {
            padding: 0,
            margin: 0,
        },
    },
});

function renderRow(props: ListChildComponentProps) {
    const { data, index, style } = props;
    const dataSet = data[index];

    const inlineStyle = {
        ...style,
        top: (style.top as number) + LISTBOX_PADDING,
    };  

    return (
        <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
            {dataSet[1]}
        </Typography>
    );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = React.useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {

    const { children, ...other } = props;
    const itemData: React.ReactElement[] = [];

    (children as React.ReactElement[]).forEach(
        (item: React.ReactElement & { children?: React.ReactElement[]; }) => {
            itemData.push(item);
            itemData.push(...(item.children || []));
        },
    );

    return (
        <div ref={ref}>
            <OuterElementContext.Provider value={other}>
                <VariableSizeList
                    itemData={itemData}
                    height={400}
                    width="100%"
                    outerElementType={OuterElementType}
                    innerElementType="ul"
                    itemSize={() => 36}
                    overscanCount={5}
                    itemCount={itemData.length}
                >
                    {renderRow}
                </VariableSizeList>
            </OuterElementContext.Provider>
        </div>
    );
});



export default ListboxComponent;