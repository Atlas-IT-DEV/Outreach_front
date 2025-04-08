import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
const CreateKeyModal = observer(({ fetchKeys }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [textKey, setTextKey] = useState("");
  const [courseId, setCourseId] = useState("");
  const [creatorId, setCreatorId] = useState("");
  const [status, setStatus] = useState("A");
  const toast = useToast();
  const { pageStore } = useStores();

  const handleCreateKey = async () => {
    try {
      const response = await fetch(
        "https://me-course.com:8069/api/course/key/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.acc_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: 0,
            text_key: textKey,
            course_id: parseInt(courseId),
            status: "A",
            creator_id: `${pageStore.user_data.id}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Не удалось создать ключ");
      }

      const data = await response.json();
      toast({
        title: "Ключ создан",
        description: `Ключ успешно создан: ${data.text_key}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      fetchKeys();
      // Очистить форму и закрыть модалку после создания
      setTextKey("");
      setCourseId("");
      setCreatorId("");
      setStatus("A");
      onClose();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"#4682B4"} color={"white"}>
        Создать ключ
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Создание ключа</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text mb={2}>Текст ключа</Text>
              <Input
                value={textKey}
                onChange={(e) => setTextKey(e.target.value)}
                placeholder="Введите текст ключа"
                mb={3}
              />
              <Text mb={2}>ID курса</Text>
              <Input
                type="number"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Введите ID курса"
                mb={3}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Закрыть
            </Button>
            <Button colorScheme="teal" onClick={handleCreateKey} ml={3}>
              Создать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});

export default CreateKeyModal;
