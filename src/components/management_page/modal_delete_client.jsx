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

const ModalDeleteClient = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const toast = useToast();

  const deleteCompany = async () => {
    const response = await fetch(
      `http://158.255.7.7:8081/api/companies/${obj?.ID}`,
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
  const handleDeleteCompany = async () => {
    const ok = await deleteCompany();
    if (ok) {
      await pageStore.getAllCompanies();
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
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        border={"2px solid #4682B4"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
        flexShrink={0}
      >
        <Text>Удалить</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
            Удалить клиента?
          </Text>
          <HStack marginTop={"20px"} justify={"center"} width={"100%"}>
            <Button
              onClick={onClose}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"2px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
              flexShrink={0}
            >
              <Text>Отменить</Text>
            </Button>
            <Button
              onClick={async () => await handleDeleteCompany()}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"2px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
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

export default ModalDeleteClient;
