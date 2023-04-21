<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */
declare(strict_types=1);

namespace Tigren\Electronic\Block\Adminhtml\Shipment;

use Magento\Backend\Block\Template;
use Magento\Backend\Block\Template\Context;
use Magento\Framework\Exception\NoSuchEntityException;
use Magento\Framework\Registry;
use Magento\InventoryApi\Api\SourceRepositoryInterface;
use Magento\Sales\Model\Order\Shipment;
use Magento\Framework\App\RequestInterface;
use Tigren\Electronic\Plugin\BeforeSendTrack;
use Magento\Sales\Api\ShipmentRepositoryInterface;

/**
 * Display selected source on shipment creation page
 *
 * @api
 */
class Inventory extends Template
{
    /**
     * @var Registry
     */
    private $registry;

    /**
     * @var SourceRepositoryInterface
     */
    private $sourceRepository;
    private $shipmentDetail;
    protected $request;

    /**
     * Inventory constructor.
     * @param Context $context
     * @param Registry $registry
     * @param SourceRepositoryInterface $sourceRepository
     * @param array $data
     */
    public function __construct(
        Context $context,
        Registry $registry,
        SourceRepositoryInterface $sourceRepository,
        ShipmentRepositoryInterface $shipmentDetail,
        RequestInterface $request,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->registry = $registry;
        $this->sourceRepository = $sourceRepository;
        $this->shipmentDetail = $shipmentDetail;
        $this->getRequest = $request;
    }

    /**
     * Retrieve shipment model instance
     *
     * @return Shipment
     */
    public function getShipment()
    {
        return $this->registry->registry('current_shipment');
    }

    /**
     * Retrieve source code from shipment
     *
     * @return null|string
     */
    public function getSourceCode()
    {

        $shipment = $this->getShipment();
        $extensionAttributes = $shipment->getExtensionAttributes();
        if ($sourceCode = $extensionAttributes->getSourceCode()) {
            return $sourceCode;
        }
        return null;
    }

    /**
     * Get source name by code
     *
     * @param string $sourceCode
     * @return mixed
     * @throws NoSuchEntityException
     */
    public function getSourceName(string $sourceCode): string
    {
        return $this->sourceRepository->get($sourceCode)->getName();
    }

    public function getShipmentDetail()
    {
        $id = $this->getRequest->getParams()['shipment_id'];
        $shipment = $this->shipmentDetail->get($id);
        $image = $shipment->getImage();
        return $image;
    }

}
