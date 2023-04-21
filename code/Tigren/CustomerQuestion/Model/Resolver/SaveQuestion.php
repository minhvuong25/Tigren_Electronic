<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\CustomerQuestion\Model\Resolver;

use Magento\Framework\GraphQl\Query\ResolverInterface;
use Tigren\CustomerQuestion\Model\QuestionFactory;
use Tigren\CustomerQuestion\Model\ResourceModel\Question as Questionresource;
use  Tigren\CustomerQuestion\Model\ResourceModel\Question\CollectionFactory;


/**
 *
 */
class SaveQuestion implements ResolverInterface
{


    private $modelquestion;

    private $resourcequestion;
    private $CollectionFactory;

    public function __construct(
        QuestionFactory $_modelQuestion,
        Questionresource $ResourceQuestion,
        \Magento\Framework\Stdlib\DateTime\DateTime $date,
        CollectionFactory $CollectionFactory
    ) {
        $this->date = $date;
        $this->modelquestion = $_modelQuestion;
        $this->resourcequestion = $ResourceQuestion;
        $this->collection = $CollectionFactory;
    }


    public function resolve(
        $field,
        $context,
        $info,
        array $value = null,
        array $args = null
    ) {

        //        if (isset($args['id'])) {
        //            $model = $this->modelquestion->create();
        //            $itemData = [
        //                // 'entity_id' => '',
        //                'title' => $args['title'],
        //                'content' => $args['content'],
        //                'customer_name' => $args['customer_name'],
        //                'created_at' => $this->date->gmtDate(),
        //                'updated_at' => $this->date->gmtDate()
        //            ];
        //            $model->load($args['id']);
        //            $model->setData($itemData);
        //            $save = $model->save();
        //            if ($save) {
        //                return ['success_message' => 'success'];
        //            } else {
        //                return ['success_message' => 'fail'];
        //            }
        //        } else {
        $itemData = [
            // 'entity_id' => '',
            'title' => $args['title'],
            'content' => $args['content'],
            'customer_name' => $args['customer_name'],
            'created_at' => $this->date->gmtDate(),

            'updated_at' => $this->date->gmtDate()
        ];
        $model = $this->modelquestion->create();
        $data_model = $model->setData($itemData);
        if ($this->resourcequestion->save($data_model)) {
            return ['success_message' => 'success'];
        } else {
            return ['success_message' => 'fail'];
        }
    }


    //   }


}
