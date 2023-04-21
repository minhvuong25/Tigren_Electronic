<?php

namespace Tigren\CustomerQuestion\Model\ResourceModel ;

class Question extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb {


    protected function _construct()
    {
        $this->_init('tigren_customer_question','entity_id');
    }
}
