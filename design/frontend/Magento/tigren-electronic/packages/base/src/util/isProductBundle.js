// TODO: Move/merge with product util in peregrine?
export const isProductBundle = product =>
    product.__typename === 'BundleProduct';
