import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import VideosAccordion from "./videos_accordeon";
import CreateVideoModal from "./create_video_modal";
import ModalDeleteProduct from "./modal_delete_product";

const ModulesAccordion = observer(({ module }) => {
  const [title, setTitle] = useState(module.title);
  const [description, setDescription] = useState(module.description);
  const [position, setPosition] = useState(module.position);
  const [createdAt, setCreatedAt] = useState(module.created_at);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { pageStore } = useStores();

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpdate = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("course_id", module.course_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("position", position);
    formData.append("created_at", createdAt);

    // Добавляем выбранные файлы в FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        `https://me-course.com:8069/api/modules/${module.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${pageStore.acc_token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast({
          title: "Модуль обновлен",
          description: "Информация о модуле успешно изменена",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        pageStore.getAllCourses();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить модуль",
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

    setLoading(false);
  };

  return (
    <Accordion allowToggle width="100%">
      <AccordionItem
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        bg="white"
      >
        <AccordionButton p={4} _expanded={{ bg: "gray.100" }}>
          <HStack flex="1" textAlign="left" spacing={4}>
            <Icon as={FaEdit} boxSize={6} />
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize={["14px", "18px"]} fontWeight="500">
                Модуль "{module.title}"
              </Text>
              <Text fontSize={["12px", "18px"]} color="gray.500">
                Позиция: {module.position}
              </Text>
            </VStack>
          </HStack>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <VStack align="start" spacing={3} width="100%">
            <Text fontSize={["12px", "18px"]} fontWeight="bold">
              Редактирование модуля
            </Text>

            <FormControl>
              <FormLabel fontSize={["14px", "18px"]}>Название</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fontSize={["14px", "18px"]}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "18px"]}>Описание</FormLabel>
              <Textarea
                fontSize={["14px", "18px"]}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "18px"]}>Позиция</FormLabel>
              <Input
                fontSize={["14px", "18px"]}
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "18px"]}>Файлы</FormLabel>
              <Input
                type="file"
                multiple
                onChange={handleFileChange}
                fontSize={["14px", "18px"]}
              />
            </FormControl>
            <HStack width={"100%"} justify={"space-between"}>
              <Button
                leftIcon={<FaSave />}
                backgroundColor={"#4682B4"}
                isLoading={loading}
                color={"white"}
                onClick={handleUpdate}
                fontSize={["12px", "18px"]}
              >
                Сохранить изменения
              </Button>
              <ModalDeleteProduct
                product_id={module.id}
                url={"https://me-course.com:8069/api/modules/"}
              />
            </HStack>

            <CreateVideoModal moduleId={module.id} />
            {module.videos.map((video) => (
              <VideosAccordion video={video} />
            ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});

export default ModulesAccordion;
