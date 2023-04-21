<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\CustomerQuestion\Model\Resolver;

use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use  Tigren\CustomerQuestion\Model\ResourceModel\Question\CollectionFactory;

class QuestionSearch implements ResolverInterface
{
    private $CollectionFactory;

    public function __construct(
        CollectionFactory $CollectionFactory
    ) {
        $this->collection = $CollectionFactory;
    }

    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        $collectionfactory = $this->collection->create();
        $value = $collectionfactory->addFieldToFilter("entity_id", $args['id']);
        return ['items' => $value];
    }
}
