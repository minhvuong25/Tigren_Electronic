import React from 'react';
import { bool, shape, string } from 'prop-types';
import { Form } from 'informed';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar/useSearchBar';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Autocomplete from '@tigrensolutions/core/src/components/SearchBar/autocomplete';
import SearchField from '@tigrensolutions/core/src/components/SearchBar/searchField';
import defaultClasses from './searchBar.module.css';
import { FormattedMessage } from 'react-intl';

const SearchBar = React.forwardRef((props, ref) => {
    const { isOpen } = props;
    const talonProps = useSearchBar();
    const {
        containerRef,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        valid
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <div className={rootClassName} ref={ref}>
            <div ref={containerRef} className={classes.container}>
                <Form
                    autoComplete="off"
                    className={classes.form}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    <div className={classes.search}>
                        <SearchField
                            isSearchOpen={isOpen}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                        <button
                            disabled={!valid}
                            className={classes.viewAllResult}
                            onClick={handleSubmit}
                        >
                            <FormattedMessage
                                id={'searchTrigger.search'}
                                defaultMessage={'Search'}
                            />
                        </button>
                    </div>
                    <div className={classes.autocomplete}>
                        <Autocomplete
                            setVisible={setIsAutoCompleteOpen}
                            valid={valid}
                            visible={isAutoCompleteOpen}
                            isShowCategories={true}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
});

export default SearchBar;

SearchBar.propTypes = {
    classes: shape({
        autocomplete: string,
        container: string,
        form: string,
        root: string,
        root_open: string,
        search: string
    }),
    isOpen: bool
};
