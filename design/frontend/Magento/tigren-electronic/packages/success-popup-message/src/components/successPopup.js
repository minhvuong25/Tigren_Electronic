import React from 'react';
import { useSuccessPopup } from '../talons/useSuccessPopup';
import Dialog from '@magento/venia-ui/lib/components/Dialog';
import { FormattedMessage } from 'react-intl';
import Button from '@magento/venia-ui/lib/components/Button';
import Image from '@magento/venia-ui/lib/components/Image';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './successPopup.module.css';

const IMAGE_SIZE = 100;

function SuccessPopup() {
    const classes = useStyle(defaultClasses);
    const {
        item,
        small_image,
        name,
        handleClose,
        handleViewCart
    } = useSuccessPopup();

    const productImage = small_image?.url ? small_image.url : small_image;

    return (
        <>
            <Dialog
                classes={{
                    contents: classes.contents,
                    dialog: classes.dialog,
                    body: classes.dialog_body,
                    header: classes.dialog_header,
                    form: classes.dialog_form
                }}
                confirmText={'Update'}
                confirmTranslationId={'productForm.submit'}
                isOpen={!!item}
                onCancel={handleClose}
                formProps={{
                    initialValues: {
                        quantity: 1
                    }
                }}
                shouldUnmountOnHide={false}
                shouldShowButtons={false}
                isForm={false}
                isLock={false}
            >
                <div className={classes.root}>
                    <div className={classes.body}>
                        <div className={classes.product}>
                            <div className={classes.image}>
                                {productImage && (
                                    <Image
                                        alt={name}
                                        width={IMAGE_SIZE}
                                        resource={
                                            small_image.url
                                                ? small_image.url
                                                : small_image
                                        }
                                    />
                                )}
                            </div>
                            <div className={classes.message}>
                                <h2>{name}</h2>
                                <span>
                                    <FormattedMessage
                                        id={'successPopup.message'}
                                        defaultMessage={
                                            'has been added to your cart.'
                                        }
                                    />
                                </span>
                            </div>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button priority="normal" onClick={handleClose}>
                                <FormattedMessage
                                    id={'global.continue'}
                                    defaultMessage={'Continue Shopping'}
                                />
                            </Button>
                            <Button priority="low" onClick={handleViewCart}>
                                <FormattedMessage
                                    id={'successPopup.viewCart'}
                                    defaultMessage={'View Cart'}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default SuccessPopup;
