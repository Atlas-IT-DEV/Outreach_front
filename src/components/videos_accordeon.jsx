import {
  Box,
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
import ModalDeleteProduct from "./modal_delete_product";

const VideosAccordion = observer(({ video }) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);
  const [position, setPosition] = useState(video.position);
  const [videoUrl, setVideoUrl] = useState(video.video_url);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
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

  const handleUpdate = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("module_id", video.module_id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("position", position);
    formData.append("video_url", videoUrl);
    formData.append("created_at", getTime());

    // Добавляем выбранные файлы в FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        `https://me-course.com:8069/api/videos/${video.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.acc_token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        toast({
          title: "Видео обновлено",
          description: "Информация о видео успешно изменена",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        pageStore.getAllCourses(); // Обновляем список видео
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить видео",
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
                УРОК "{video.title}"
              </Text>
              <Text fontSize={["12px", "18px"]} color="gray.500">
                Позиция: {video.position}
              </Text>
            </VStack>
          </HStack>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <VStack align="start" spacing={3} width="100%">
            <Text fontSize={["14px", "18px"]} fontWeight="500">
              Редактирование видео
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fontSize={["14px", "18px"]}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "18px"]}>Позиция</FormLabel>
              <Input
                type="number"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                fontSize={["14px", "18px"]}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "18px"]}>Ссылка на видео</FormLabel>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                fontSize={["14px", "18px"]}
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
                Сохранить
              </Button>
              <ModalDeleteProduct
                product_id={video.id}
                url={"https://me-course.com:8069/api/videos/"}
              />
            </HStack>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});

export default VideosAccordion;
