import React from 'react';
import { func } from 'prop-types';
import { useSearchField } from '@magento/peregrine/lib/talons/SearchBar';
import { useIntl } from 'react-intl';
import TextInput from '@magento/venia-ui/lib/components/TextInput';

const SearchField = props => {
    const { isSearchOpen, onChange, onFocus } = props;
    const { inputRef } = useSearchField({ isSearchOpen });
    const { formatMessage } = useIntl();

    return (
        <TextInput
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
            placeholder={formatMessage({
                id: 'searchField.placeholder',
                defaultMessage: 'Search entire store here...'
            })}
        />
    );
};

export default SearchField;

SearchField.propTypes = {
    onChange: func,
    onFocus: func
};
