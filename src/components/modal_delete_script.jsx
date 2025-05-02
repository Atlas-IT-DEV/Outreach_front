import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store/store_context";

const ModalDeleteScript = observer(({ obj = {}, onСloses }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const toast = useToast();

  const deleteScript = async () => {
    const response = await fetch(
      `http://158.255.7.7:8081/api/scripts/${obj?.ID}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `${pageStore.token}`,
        },
      }
    );
    return response.ok;
  };

  const handleDeleteScript = async () => {
    const ok = await deleteScript();
    if (ok) {
      pageStore.updateSelectedScript({});
      pageStore.getAllScripts();
      onClose();
      toast({
        title: "Успех",
        description: "Скрипт успешно удалён",
        duration: "3000",
        status: "success",
      });
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        flexShrink={0}
      >
        <Text>Удалить</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text fontWeight={"600"} width={"100%"} textAlign={"center"}>
            Удалить скрипт?
          </Text>
          <HStack marginTop={"20px"} justify={"center"} width={"100%"}>
            <Button
              onClick={onClose}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
              flexShrink={0}
            >
              <Text>Отменить</Text>
            </Button>
            <Button
              onClick={async () => await handleDeleteScript()}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
              flexShrink={0}
            >
              <Text>Удалить</Text>
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalDeleteScript;
