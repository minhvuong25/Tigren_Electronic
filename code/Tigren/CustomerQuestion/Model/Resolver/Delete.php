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
use Tigren\CustomerQuestion\Model\QuestionFactory;
use  Tigren\CustomerQuestion\Model\ResourceModel\Question as QuestionResource;

class Delete implements ResolverInterface
{
    private $model;
    private $resource;

    public function __construct(QuestionFactory $model)
    {
        $this->model = $model;

    }

    public function resolve(Field $field, $context, ResolveInfo $info, array $value = null, array $args = null)
    {
        $deletemodel = $this->model->create();
        $deletemodel->load($args['id']);
        $deletemodel->

        $writer = new \Zend_Log_Writer_Stream(BP . '/var/log/custom.log');
        $logger = new \Zend_Log();
        $logger->addWriter($writer);
        $logger->info(print_r($args['id'], true));
        return ['success_message' => 'success'];
        //        $deletemodel->load($args['id']);
        //        $successDelete = $deletemodel->delete();
        //        if ($successDelete) {
        //            return ['success_message' => 'success'];
        //        } else {
        //            return ['success_message' => 'fail'];
        //        }
    }
}
