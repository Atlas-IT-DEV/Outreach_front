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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useStores } from "../store/store_context";

const ModalDeleteComment = ({ comment_id, onCommentDeleted }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();

  const deleteComment = async () => {
    try {
      const response = await fetch(
        `https://apbstore.ru:8008/product_comments/${comment_id}`,
        {
          method: "DELETE",
          headers: { accept: "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Ошибка удаления: ${response.status}`);
      }

      if (onCommentDeleted) {
        onCommentDeleted(); // Колбэк для обновления комментариев после удаления
      }

      console.log("Комментарий успешно удалён");
      pageStore.getComments();
    } catch (error) {
      console.error("Ошибка при удалении комментария:", error);
    }
  };

  return (
    <>
      <VscTrash cursor="pointer" onClick={onOpen} color="red" size={20} />

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgColor={"rgb(33, 33, 52)"} color={"white"}>
          <ModalHeader>Удалить комментарий?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              После удаления восстановить комментарий будет невозможно.
            </Text>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                bgColor={"red"}
                onClick={async () => {
                  await deleteComment();
                  onClose();
                }}
              >
                Удалить
              </Button>
              <Button onClick={onClose} bgColor={"rgb(73, 69, 255)"}>
                Отмена
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeleteComment;
