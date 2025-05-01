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
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const ModalDeleteLead = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const toast = useToast();

  const deleteClient = async () => {
    const response = await fetch(
      `http://158.255.7.7:8081/api/clients/${obj?.ID}`,
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
  const handleDeleteClient = async () => {
    const ok = await deleteClient();
    if (ok) {
      await pageStore.getAllClients();
      toast({
        title: "Успех",
        description: "Лид успешно удален",
        duration: 3000,
        status: "success",
      });
      onClose();
    }
  };
  return (
    <>
      <Button
        onClick={() => onOpen()}
        
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        flexShrink={0}
      >
        <Text>Удалить</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
            Удалить лида?
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
              onClick={async () => await handleDeleteClient()}
              
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

export default ModalDeleteLead;
