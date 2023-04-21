<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\Electronic\Observer;

use Magento\Framework\App\RequestInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Sales\Api\ShipmentRepositoryInterface;
use Magento\Checkout\Model\Session;
use Magento\Framework\Registry;

/**
 *
 */
class SalesOrderShipmentBefore implements ObserverInterface
{
    // Filesystem object to get the pub/media directory path
    /**
     * @var RequestInterface
     */

    protected RequestInterface $request;

    /**
     * @var ShipmentRepositoryInterface
     *
     */
    protected ShipmentRepositoryInterface $shipmentRepository;

    /**
     * @var
     */
    protected $checkoutsession;
    protected $data;
    protected $registry;

    /**
     * @param RequestInterface $request
     * @param ShipmentRepositoryInterface $shipmentRepository
     */
    public function __construct(
        RequestInterface $request,
        ShipmentRepositoryInterface $shipmentRepository,
        Session $checkoutsession,
        Registry $registry
    ) {
        $this->registry = $registry;
        $this->checkoutsession = $checkoutsession;
        $this->request = $request;
        $this->shipmentRepository = $shipmentRepository;
    }

    /**
     * @param Observer $observer
     * @return void
     */
    public function execute(Observer $observer)
    {
        $shipment = $observer->getEvent()->getShipment();
        $order = $shipment->getOrder();

        $imageSaveName = $this->registry->registry('image');
        $shipment->setData('image', $imageSaveName);
    }


}
