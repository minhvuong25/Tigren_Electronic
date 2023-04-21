Documentation for Tigren PWA Base Add-on

## Overview

Extend Price component to show old price, special price on all pages

## How to use

    In default, all prices will show as "Short" format (provided by PWA Studio)
    Example for "Long" format:
    `<Price
        type={'full'}
        product={product}
        value={price_range.maximum_price.regular_price.value}
        currencyCode={price_range.maximum_price.regular_price.currency}
    />`
    - product: product data
    - type: format to show price

## Release Notes


