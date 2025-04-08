import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const CreateCourseModal = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { pageStore } = useStores();

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };
  const get_time = () => {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const timeInMilliseconds = now.getTime();
    const timeInHours = Math.floor(timeInMilliseconds / 3600000); // Убираем шесть нулей
    console.log(timeInHours); // Пример вывода: 471403
    return timeInHours;
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("color_config_id", "30"); // Пример значения
    formData.append("title", title);
    formData.append("description", description);
    formData.append("created_at", get_time());
    formData.append("creator_id", String(pageStore.user_data.id));

    // Добавляем файлы в FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("https://me-course.com:8069/api/courses/", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${pageStore.acc_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Курс создан",
          description: "Курс успешно создан",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        pageStore.getAllCourses();
        onClose(); // Закрываем модальное окно после успешного создания
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось создать курс",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast({
        title: "Ошибка",
        description: "Проблема с соединением",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      {/* Кнопка для открытия модального окна */}
      <Button
        leftIcon={<FaPlus />}
        color={"white"}
        backgroundColor={"#4682B4"}
        onClick={onOpen}
      >
        Создать курс
      </Button>

      {/* Модальное окно */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создать новый курс</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Название курса</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Описание курса</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Файлы</FormLabel>
                <Input type="file" multiple onChange={handleFileChange} />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Создать
            </Button>
            <Button onClick={onClose}>Отмена</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default CreateCourseModal;
