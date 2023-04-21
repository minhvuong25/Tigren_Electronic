<?php
 namespace  Tigren\CustomerQuestion\Model\Resolver ;

 use Magento\Framework\GraphQl\Query\ResolverInterface;
 use Tigren\CustomerQuestion\Model\ResourceModel\Question\CollectionFactory;


 class Question implements ResolverInterface {

     private $question_field  ;
     private  $key,$vale ;

     public function __construct( CollectionFactory $question_field)
     {
         $this->question_field = $question_field ;
     }


     public function resolve(
         $field,
         $context,
         $info,
         array $value = null,
         array $args = null
     ) {
         $questionCollection = $this->question_field->create();
         $questions = [];
         foreach ($questionCollection as $question ){
             $questions[] = $this->QuestionData($question);
         }

         return ['items'=> $questionCollection] ;

     }

     private function QuestionData($question)
     {
         return [
             'entity_id' => $question->getEntityId(),
             'title' => $question->getTitle(),
             'customer_name' => $question->getCustomerName(),
             'content' => $question->getContent(),
             'created_at ' => $question->getCreatedAt(),
             'updated_at' => $question->getUpdatedAt(),
         ];

     }
 }
