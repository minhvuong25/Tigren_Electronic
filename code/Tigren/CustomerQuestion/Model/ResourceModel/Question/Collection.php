<?php

namespace Tigren\CustomerQuestion\Model\ResourceModel\Question;


use \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected function _construct()
    {
        $this->_init('Tigren\CustomerQuestion\Model\Question', 'Tigren\CustomerQuestion\Model\ResourceModel\Question');
    }
}
