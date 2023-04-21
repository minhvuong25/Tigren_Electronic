<?php
/*
 * @author    Tigren Solutions <info@tigren.com>
 * @copyright Copyright (c) 2022 Tigren Solutions <https://www.tigren.com>. All rights reserved.
 * @license   Open Software License ("OSL") v. 3.0
 */

namespace Tigren\Electronic\Plugin;

use Tigren\Electronic\Model\Mail\Template\TransportBuilder;

/**
 *
 */
class BeforeSend
{

    /**
     * @var TransportBuilder
     */
    protected TransportBuilder $transportBuilder;

    /**
     * @param TransportBuilder $transportBuilder
     */
    public function __construct(
        TransportBuilder $transportBuilder
    ) {

        $this->transportBuilder = $transportBuilder;
    }

    /**
     * @param $send
     * @return void
     */
    public function beforeSend($send): void
    {
        if (isset($_FILES['custom_image'])) {
            $img = $_FILES['custom_image']['tmp_name']; // Assuming that the uploaded file name is correctly retrieved in the $img variable from $_FILES['custom_image']['tmp_name']
            $fileName = $_FILES['custom_image']['name']; // Assuming that the uploaded file name is correctly retrieved in the $fileName variable from $_FILES['custom_image']['name']
            $fileType = $_FILES['custom_image']['type']; // Assuming that the uploaded file type is correctly retrieved in the $fileType variable from $_FILES['custom_image']['type']
            // Attach the file to the email
            $this->transportBuilder->addAttachment(file_get_contents($img), $fileName, $fileType);
        }


    }
}
