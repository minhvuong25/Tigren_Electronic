<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\Electronic\Observer;

use Exception;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

/**
 *
 */
class SalesOrderShipmentTrackAfter implements ObserverInterface
{

    /**
     * @param Observer $observer
     * @return void
     */

    public function execute(Observer $observer)
    {
        try {
            $shipment = $observer->getEvent()->getShipment();
            $tracksCollection = $shipment->getTracksCollection();
            foreach ($tracksCollection->getItems() as $track) {
                $trackNumber = $track->getTrackNumber();
                $carrierName = $track->getTitle();
            }
        } catch (Exception $e) {
        }
    }
}