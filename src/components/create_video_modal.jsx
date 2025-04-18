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

const CreateVideoModal = observer(({ moduleId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { pageStore } = useStores();

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const getTime = () => {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    const timeInMilliseconds = now.getTime();
    const timeInHours = Math.floor(timeInMilliseconds / 3600000); // Убираем шесть нулей
    return timeInHours;
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("module_id", moduleId); // ID модуля, к которому привязывается видео
    formData.append("title", title);
    formData.append("description", description);
    formData.append("position", position);
    formData.append("video_url", videoUrl);
    formData.append("created_at", getTime());

    // Добавляем файлы в FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("https://me-course.com:8069/api/videos/", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${pageStore.acc_token}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Видео создано",
          description: "Видео успешно создано",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        pageStore.getAllCourses(); // Обновляем список видео
        onClose(); // Закрываем модальное окно после успешного создания
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось создать видео",
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
        fontSize={["12px", "18px"]}
      >
        Создать видео
      </Button>

      {/* Модальное окно */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создать новое видео</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Название видео</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Описание видео</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Позиция видео</FormLabel>
                <Input
                  type="number"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Ссылка на видео</FormLabel>
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
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

export default CreateVideoModal;
