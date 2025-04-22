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
import useWindowDimensions from "../../windowDimensions";
import { useStores } from "../../store/store_context";

const ModalDeleteWork = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const deleteWork = async () => {
    const response = await fetch(
      `http://158.255.7.7:8081/api/works/${obj?.ID}`,
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

  const handleDelete = async () => {
    const ok = await deleteWork();
    if (ok) {
      await pageStore.getAllWorks();
      toast({
        title: "Успех",
        description: "Ворк успешно удалён",
        duration: "3000",
        status: "success",
      });
      onClose();
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        border={"1px solid #4682B4"}
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
      >
        <Text fontSize={width >= 1000 ? "16px" : "14px"}>Удалить</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
            Удалить ворк?
          </Text>
          <HStack marginTop={"20px"} justify={"center"} width={"100%"}>
            <Button
              onClick={onClose}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"1px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
              flexShrink={0}
            >
              <Text>Отменить</Text>
            </Button>
            <Button
              onClick={async () => await handleDelete()}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"1px solid #4682B4"}
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

export default ModalDeleteWork;
