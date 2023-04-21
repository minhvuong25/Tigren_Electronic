<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */
declare(strict_types=1);

namespace Tigren\Electronic\Model\Resolver;

use Magento\Framework\Exception\AuthenticationException;
use Magento\Framework\GraphQl\Config\Element\Field;
use Magento\Framework\GraphQl\Exception\GraphQlAuthenticationException;
use Magento\Framework\GraphQl\Exception\GraphQlInputException;
use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Integration\Api\CustomerTokenServiceInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;

/**
 * Customers Token resolver, used for GraphQL request processing.
 */
class CheckSigninPopup implements ResolverInterface
{
    /**
     * @var CustomerTokenServiceInterface
     */
    private $customerTokenService;
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * @param CustomerTokenServiceInterface $customerTokenService
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        CustomerTokenServiceInterface $customerTokenService,
        ScopeConfigInterface $scopeConfig,
    ) {
        $this->customerTokenService = $customerTokenService;
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * @inheritdoc
     */
    public function resolve(
        Field $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (empty($args['email'])) {
            throw new GraphQlInputException(__('Specify the "email" value.'));
        }

        if (empty($args['password'])) {
            throw new GraphQlInputException(__('Specify the "password" value.'));
        }

        try {
            $email = $args['email'];
            $password = $args['password'];
            $emailScope = $this->scopeConfig->getValue('popup/config_popup_display/userpopup');
            $passwordScope = $this->scopeConfig->getValue('popup/config_popup_display/passwordpopup');
            $statusLoginPopup = true;
            if ($email == $emailScope && $password == $passwordScope) {
                $statusLoginPopup = true;
            } else {
                $statusLoginPopup = false;
            }
            return ['status' => $statusLoginPopup];

        } catch (AuthenticationException $e) {
            throw new GraphQlAuthenticationException(__($e->getMessage()), $e);
        }
    }
}
