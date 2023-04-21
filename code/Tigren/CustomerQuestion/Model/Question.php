<?php

namespace Tigren\CustomerQuestion\Model ;

class Question extends \Magento\Framework\Model\AbstractModel  {

   public function _construct()
   {
       $this->_init('Tigren\CustomerQuestion\Model\ResourceModel\Question');
   }
}
