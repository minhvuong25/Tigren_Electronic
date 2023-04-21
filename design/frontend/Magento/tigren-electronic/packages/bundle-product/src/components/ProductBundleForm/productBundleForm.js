import React, { useMemo, Suspense } from 'react';
import BundleItem from './bundleItem';
import defaultClasses from './productBundleForm.module.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import { FormattedMessage } from 'react-intl';
import { useProductBundleForm } from '@tigrensolutions/bundle-product/src/talons/useProductBundleForm';
import Price from '@magento/venia-ui/lib/components/Price';
import { QuantityFields } from '@magento/venia-ui/lib/components/CartPage/ProductListing/quantity';
import Button from '@magento/venia-ui/lib/components/Button';
import { Form } from 'informed';

const ProductBundleForm = props => {
    const { product, storeCurrency } = props;
    const { items, stock_status, dynamic_price, options } = product;

    const talonProps = useProductBundleForm({
        product
    });
    const {
        summaryPriceExTax,
        summaryPrice,
        handleAddToCart,
        isAddToCartDisabled,
        selectedOptions,
        handleOptionChange,
        handleChangeOptionQty,
        setFormApi,
        handleCustomizeOptionChange,
        isShowExclTax
    } = talonProps;
    const classes = useStyle(props.classes, defaultClasses);
    const bundleItems = useMemo(
        () =>
            items &&
            items.map((item, index) => {
                return (
                    <div key={index} className={classes.bundleItem}>
                        <BundleItem
                            dynamicPrice={dynamic_price}
                            storeCurrency={storeCurrency || 'USD'}
                            index={index}
                            item={item}
                            selectedOptions={selectedOptions}
                            handleOptionChange={handleOptionChange}
                            handleChangeOptionQty={handleChangeOptionQty}
                            isShowExclTax={isShowExclTax}
                            classes={classes}
                        />
                    </div>
                );
            }),
        [items, selectedOptions, handleOptionChange, handleChangeOptionQty]
    );

    const isAvailable = stock_status === 'IN_STOCK';

    const bundleSummary = useMemo(
        () =>
            selectedOptions.map((selectedOption, index) => {
                if (
                    selectedOption.id &&
                    selectedOption.values &&
                    selectedOption.values.length
                ) {
                    return (
                        <ul key={index}>
                            <li>
                                <strong className={classes.optionLabel}>
                                    {selectedOption.title}
                                </strong>
                                <div data-container="options">
                                    <div>
                                        {selectedOption.values.map(
                                            (value, ind) => {
                                                return (
                                                    <span key={ind}>
                                                        {value.qty} x{' '}
                                                        {value.label}
                                                    </span>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    );
                }
            }),
        [selectedOptions, classes.optionLabel]
    );

    return (
        <>
            <Form
                id={'bundleForm'}
                className={classes.root}
                onSubmit={handleAddToCart}
                getApi={setFormApi}
            >
                <div className={classes.options}>
                    <h2 className={classes.title}>
                        <FormattedMessage
                            id={'bundleForm.customizeProductName'}
                            defaultMessage={'Customize {productName}'}
                            values={{
                                productName: product.name
                            }}
                        />
                    </h2>
                    {bundleItems}
                </div>
                <div className={classes.summary}>
                    <h2 className={classes.title}>
                        <FormattedMessage
                            id={'bundleForm.yourCustomization'}
                            defaultMessage={'Your Customization'}
                        />
                    </h2>
                    <div className={classes.content}>
                        <div className={classes.bundleInfo}>
                            <div className={classes.cartActions}>
                                {isAvailable ? (
                                    <>
                                        <QuantityFields min={1} />
                                        <Button
                                            priority="high"
                                            type={'submit'}
                                            disabled={isAddToCartDisabled}
                                        >
                                            <FormattedMessage
                                                id={
                                                    'addToCartButton.addItemToCart'
                                                }
                                                defaultMessage={'Add to Cart'}
                                            />
                                        </Button>
                                    </>
                                ) : (
                                    <Button disabled priority="high">
                                        <span>
                                            <FormattedMessage
                                                id={
                                                    'addToCartButton.itemOutOfStock'
                                                }
                                                defaultMessage={'Out of Stock'}
                                            />
                                        </span>
                                    </Button>
                                )}
                            </div>
                            <div className={classes.priceBox}>
                                <Price
                                    value={summaryPrice}
                                    currencyCode={storeCurrency || 'USD'}
                                />
                                {isShowExclTax && (
                                    <div className={classes.exclPrice}>
                                        <FormattedMessage
                                            id="productPrice.textPriceExclTax"
                                            defaultMessage="Excl. Tax: "
                                        />
                                        <Price
                                            value={summaryPriceExTax}
                                            currencyCode={
                                                storeCurrency || 'USD'
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                            <div className={classes.bundleSummary}>
                                <h2 className={classes.subtitle}>
                                    <FormattedMessage
                                        id={'bundleForm.summary'}
                                        defaultMessage={'Summary'}
                                    />
                                </h2>
                                {bundleSummary}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default ProductBundleForm;
