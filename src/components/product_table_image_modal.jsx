import { useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, Image } from "@chakra-ui/react";

const ModalImageTable = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        src={url}
        boxSize="50px"
        objectFit="cover"
        borderRadius="md"
        cursor={"pointer"}
        onClick={() => onOpen()}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Image width={"100%"} src={url} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalImageTable;
