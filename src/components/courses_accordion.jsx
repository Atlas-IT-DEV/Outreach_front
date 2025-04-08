import {
  Box,
  Image,
  Text,
  Progress,
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
import { FaBook, FaSave } from "react-icons/fa";
import { useState } from "react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import ModuleCard from "./module_card";
import ModulesAccordion from "./modules_accordeom";
import CreateModuleModal from "./create_module_modal";
import ModalDeleteProduct from "./modal_delete_product";

const CoursesAccordion = observer(({ course }) => {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [creatorId, setCreatorId] = useState(course.creator_id);
  const [createdAt, setCreatedAt] = useState(course.created_at);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const toast = useToast();
  const { pageStore } = useStores();
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpdate = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("color_config_id", course.color_config.id);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("created_at", createdAt);
    formData.append("creator_id", creatorId);
    // Добавляем выбранные файлы в FormData
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch(
        `https://me-course.com:8069/api/courses/${course.id}`,
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
          title: "Курс обновлен",
          description: "Информация о курсе успешно изменена",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        pageStore.getAllCourses();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить курс",
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
            <Image
              src={"https://me-course.com:8069/" + course.images[0].path}
              borderRadius="md"
              boxSize="50px"
            />
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize={["14px", "20px"]} fontWeight="500">
                ID: {course.id} Курс "{course.title}"
              </Text>
              <HStack>
                <Icon as={FaBook} />
                <Text fontSize={["12px", "20px"]}>
                  {course.modules.flatMap((elem) => elem.videos).length}{" "}
                  Уроков(а)
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <AccordionIcon />
        </AccordionButton>

        {/* Панель с полной информацией */}
        <AccordionPanel pb={4}>
          <VStack align="start" spacing={3} width="100%">
            <Text fontSize={["14px", "20px"]} fontWeight="500">
              Полная информация
            </Text>

            {/* Форма редактирования */}
            <FormControl>
              <FormLabel fontSize={["14px", "20px"]}>Название</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fontSize={["14px", "20px"]}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "20px"]}>Описание</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fontSize={["14px", "20px"]}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize={["14px", "20px"]}>Файлы</FormLabel>
              <Input type="file" multiple onChange={handleFileChange} />
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
                url={"https://me-course.com:8069/api/courses/"}
                product_id={course.id}
              />
            </HStack>

            <CreateModuleModal courseId={course.id} />
            {course.modules.map((module) => (
              <ModulesAccordion module={module} />
            ))}
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
});

export default CoursesAccordion;
