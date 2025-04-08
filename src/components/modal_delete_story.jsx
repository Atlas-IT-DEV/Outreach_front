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

const ModalDeleteStory = ({ story_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteStory = async () => {
    const response = await fetch(
      `https://apbstore.ru:8008/storis/${story_id}`,
      { method: "DELETE", headers: { accept: "application/json" } }
    );
  };
  const { pageStore } = useStores();
  return (
    <>
      <VscTrash
        cursor={"pointer"}
        onClick={() => onOpen()}
        color="red"
        size={20}
      />

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgColor={"rgb(33, 33, 52)"} color={"white"}>
          <ModalHeader>Действительно хочешь удалить сторис?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>После удаления сторис восстановить будет невозможно</Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                bgColor={"red"}
                onClick={async () => {
                  onClose();
                  await deleteStory();
                  await pageStore.getStorys();
                }}
              >
                Удалить
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
                bgColor={"rgb(73, 69, 255)"}
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

export default ModalDeleteStory;
