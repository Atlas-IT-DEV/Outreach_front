import { VscTrash } from "react-icons/vsc";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  HStack,
  Text,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useStores } from "../store/store_context";

const ModalDeleteProduct = ({ product_id, url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteProduct = async () => {
    const response = await fetch(`${url}${product_id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${pageStore.acc_token}`,
      },
    });
    pageStore.getAllCourses();
  };
  const { pageStore } = useStores();
  return (
    <>
      <Button
        cursor={"pointer"}
        onClick={() => onOpen()}
        color="white"
        backgroundColor={"red"}
        leftIcon={<VscTrash />}
        fontSize={["12px", "18px"]}
      >
        Удалить
      </Button>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bgColor={"white"} color={"white"}>
          <ModalHeader color={"black"}>Вы уверены?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color={"black"}>
              После удаления восстановить сущность будет невозможно, "большая
              сила - большая ответственность"
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                bgColor={"red"}
                onClick={async () => {
                  onClose();
                  await deleteProduct();
                  await pageStore.getProducts();
                }}
              >
                Удалить
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
                bgColor={"#4682B4"}
                color={"white"}
              >
                Передумал
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeleteProduct;
