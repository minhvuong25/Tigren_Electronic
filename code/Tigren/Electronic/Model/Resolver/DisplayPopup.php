<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\Electronic\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Tigren\Electronic\Helper\PopupDisplay;

/**
 *
 */
class DisplayPopup implements ResolverInterface
{

    /**
     * @var PopupDisplay
     */
    protected $_helper;

    /**
     * @param PopupDisplay $_helper
     */
    public function __construct(
        PopupDisplay $_helper
    ) {
        $this->_helper = $_helper;
    }

    /**
     * @param Field $field
     * @param $context
     * @param ResolveInfo $info
     * @param array|null $value
     * @param array|null $args
     * @return array
     */
    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        $status = $this->_helper->getGeneralConfig('enable');
        return ['status' => $status];
    }
}

