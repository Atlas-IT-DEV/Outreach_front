import {
  Button,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import { useState } from "react";

const ModalImportBase = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const [selectName, setSelectName] = useState("");
  const [selectedFile, setSelectedFile] = useState({});
  const toast = useToast();

  const uploadBase = async (name, formData) => {
    return await pageStore.uploadBase(name, formData);
  };

  const handleImportBase = async () => {
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    const ok = await uploadBase(selectName, formData);
    if (ok) {
      await pageStore.getAllBases();
      toast({
        title: "Успех",
        description: "База успешно импортирована",
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
        
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        flexShrink={0}
      >
        <Text>Импортировать базу</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text
            color={"black"}
            fontWeight={"600"}
            width={"100%"}
            textAlign={"center"}
          >
            Импорт базы
          </Text>
          <VStack
            width={"100$"}
            align={"flex-start"}
            marginTop={"20px"}
            gap={"20px"}
          >
            <Input
              border={"2px solid rgba(48, 141, 218, 1)"}
              borderRadius={"8px"}
              type="text"
              placeholder="Введите название базы"
              value={selectName}
              onChange={(e) => setSelectName(e.target.value)}
            />
            <Input
              type="file"
              accept=".csv, .xlsx"
              border={"none"}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <Text fontWeight={300} fontSize={"14px"}>
              Подсказка: можно выбрать файлы с форматами .csv, или .xlsx
            </Text>
          </VStack>

          <HStack width={"100%"} justify={"flex-end"} marginTop={"20px"}>
            <Button
              onClick={onClose}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
              flexShrink={0}
            >
              Отменить
            </Button>
            <Button
              onClick={async () => await handleImportBase()}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
              flexShrink={0}
            >
              Импортировать
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalImportBase;
