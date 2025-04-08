import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ModalProductTable = ({ product_id, src }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState([]);
  const getInfoImages = async () => {};
  return (
    <>
      <Image
        src={product.url}
        alt={product_id}
        boxSize="50px"
        objectFit="cover"
        borderRadius="md"
      />
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Изображения {product}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalProductTable;
