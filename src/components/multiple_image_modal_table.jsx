import {
  ModalBody,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  HStack,
  Text,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

const ModalImageMultiple = observer(({ urls }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        src={urls?.[0]}
        boxSize="50px"
        objectFit="cover"
        borderRadius="md"
        cursor={"pointer"}
        onClick={() => onOpen()}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(33, 33, 52)" color="white">
          <HStack width={"100%"} overflowX={"scroll"}>
            {urls.map((elem) => {
              return <Image src={`${elem}`} />;
            })}
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalImageMultiple;
