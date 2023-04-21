<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\Electronic\Plugin;

use Exception;
use Magento\Framework\App\RequestInterface;
use Magento\Shipping\Controller\Adminhtml\Order\Shipment\Save as ShipmentSaveController;
use Magento\Framework\Filesystem;
use Magento\MediaStorage\Model\File\UploaderFactory;
use Magento\Framework\Filesystem\DirectoryList;
use Magento\Framework\Message\ManagerInterface;
use Magento\Checkout\Model\Session;
use Magento\Framework\Registry;

/**
 *
 */
class BeforeSaveShipmentPlugin
{
    /**
     * @var ManagerInterface
     */
    protected $messageManager;

    /**
     * @var UploaderFactory
     */
    protected $uploaderFactory;

    /**
     * @var RequestInterface
     */
    protected $request;
    protected $registry;
    /**
     * @var DirectoryList
     */
    protected $directoryList;

    /**
     * @param RequestInterface $request
     * @param UploaderFactory $uploaderFactory
     * @param Filesystem $filesystem
     * @param DirectoryList $directoryList
     * @param ManagerInterface $messageManager
     */
    public function __construct(
        RequestInterface $request,
        UploaderFactory $uploaderFactory,
        Filesystem $filesystem,
        DirectoryList $directoryList,
        ManagerInterface $messageManager,
        Session $checkoutsession,
        \Magento\Shipping\Controller\Adminhtml\Order\ShipmentLoader $shipmentLoader,
        Registry $registry
    ) {
        $this->checkoutsession = $checkoutsession;
        $this->messageManager = $messageManager;
        $this->request = $request;
        $this->uploaderFactory = $uploaderFactory;
        $this->directoryList = $directoryList;
        $this->shipmentLoader = $shipmentLoader;
        $this->registry = $registry;
    }

    /**
     * @param ShipmentSaveController $subject
     * @return mixed
     */
    public function beforeExecute(ShipmentSaveController $subject)
    {
        $image = $this->request->getFiles("custom_image")['name'];

        try {
            $file = $this->request->getFiles("custom_image");
            $fileName = ($file && array_key_exists('name', $file)) ? $file['name'] : null;
            if ($file && $fileName) {
                $target = $this->directoryList->getPath('media') . '/image';

                $uploader = $this->uploaderFactory->create(['fileId' => $file]);

                // set allowed file extensions
                $uploader->setAllowedExtensions(['jpg', 'pdf', 'doc', 'png', 'zip', 'jpeg']);

                // allow folder creation
                $uploader->setAllowCreateFolders(true);

                // rename file name if already exists
                $uploader->setAllowRenameFiles(true);

                // upload file in the specified folder
                $result_save = $uploader->save($target);

                $imageSaveName = '';
                if ($result_save['file']) {
                    $this->messageManager->addSuccess(__('File has been successfully uploaded.'));
                    $imageSaveName = $result_save['file'];
                }

                $target . $uploader->getUploadedFileName();
                $this->registry->register('image', $imageSaveName);

            }
        } catch (Exception $e) {
            $this->messageManager->addError($e->getMessage());
        }
    }
}
