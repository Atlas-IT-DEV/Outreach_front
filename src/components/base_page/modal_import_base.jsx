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
    if (!selectedFile || selectName == "") {
      toast({
        title: "",
        description: "Название не указано или файл не выбран",
        duration: "3000",
        status: "warning",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await uploadBase(selectName, formData);
    const result = await response.json();
    if (response.ok) {
      toast({
        title: "Успех",
        description: "База успешно импортирована",
        duration: "3000",
        status: "success",
      });
      onClose();
    } else if (result?.message == "file extention not supported") {
      toast({
        title: "Ошибка",
        description:
          "Выбран неправильный формат файла. Выберите файл с форматом .csv или .xlsx",
        duration: "3000",
        status: "error",
      });
    } else if (
      result?.message.split(" ")[0] == "no" &&
      result?.message.split(" ")[1] == "column"
    ) {
      toast({
        title: "Ошибка",
        description:
          "Колонка Имя, Фамилия, Почта и/или Телефон не найдена(-ы). Проверьте правильность таблицы или загрузите другую.",
        duration: "3000",
        status: "error",
      });
    }
    pageStore.getAllBases();
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
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          // setSelectedFile({});
        }}
      >
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
            gap={"10px"}
          >
            <Text fontWeight={"500"}>Название базы</Text>
            <Input
              border={"2px solid rgba(48, 141, 218, 1)"}
              borderRadius={"8px"}
              type="text"
              placeholder="Введите название базы"
              value={selectName}
              onChange={(e) => setSelectName(e.target.value)}
            />
            <Text fontWeight={"500"}>Файл</Text>
            <Input
              type="file"
              accept=".csv, .xlsx"
              border={"none"}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setSelectName(e.target.files[0].name?.split(".")[0]); // имя без .csv/.xlsx и т.д.
              }}
            />
            <Text fontWeight={300} fontSize={"14px"}>
              Подсказка: можно выбрать файлы с форматами .csv или .xlsx
            </Text>
            <VStack width={"100%"} align={"flex-start"}>
              <Text fontWeight={500} fontSize={"14px"}>
                Важно:
              </Text>
              <Text fontWeight={300} fontSize={"14px"}>
                В файле должны обязательно должны быть столбцы: <br />
                Фамилия
                <br />
                Имя
                <br />
                Почта
                <br />
                Телефон
              </Text>
            </VStack>
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
