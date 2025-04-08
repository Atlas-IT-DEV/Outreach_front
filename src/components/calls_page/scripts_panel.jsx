import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  Textarea,
  Button,
  useToast,
  Divider,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import {
  FiEdit,
  FiSave,
  FiTrash2,
  FiMoreVertical,
  FiRefreshCw,
} from "react-icons/fi";

const ScriptsPanel = () => {
  const toast = useToast();
  const [scripts, setScripts] = useState([
    {
      id: 1,
      title: "Вводный скрипт для новых клиентов",
      content:
        "Добрый день! Меня зовут [Имя]. Я представляю компанию [Название]. Как я могу вам помочь?",
      version: 1.2,
      author: "Иванов И.И.",
      lastModified: "2023-06-15",
    },
    {
      id: 2,
      title: "Скрипт обработки возражений",
      content:
        "Я понимаю ваши сомнения. Давайте рассмотрим этот вопрос подробнее...",
      version: 2.1,
      author: "Петрова А.С.",
      lastModified: "2023-06-10",
    },
    {
      id: 3,
      title: "Скрипт upsell",
      content: "К вашему заказу мы можем предложить дополнительную услугу...",
      version: 1.5,
      author: "Отдел маркетинга",
      lastModified: "2023-05-28",
    },
  ]);

  const [selectedScript, setSelectedScript] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generationParams, setGenerationParams] = useState({
    tone: "formal",
    length: "medium",
    focus: "",
  });

  const handleScriptSelect = (script) => {
    setSelectedScript(script);
    setEditedContent(script.content);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (!selectedScript) return;

    const updatedScripts = scripts.map((script) =>
      script.id === selectedScript.id
        ? {
            ...script,
            content: editedContent,
            version: parseFloat((script.version + 0.1).toFixed(1)),
            lastModified: new Date().toISOString().split("T")[0],
          }
        : script
    );

    setScripts(updatedScripts);
    setSelectedScript({
      ...selectedScript,
      content: editedContent,
      version: parseFloat((selectedScript.version + 0.1).toFixed(1)),
      lastModified: new Date().toISOString().split("T")[0],
    });

    toast({
      title: "Скрипт сохранен",
      description: `Версия ${parseFloat(
        (selectedScript.version + 0.1).toFixed(1)
      )} сохранена`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!selectedScript) return;

    setScripts(scripts.filter((script) => script.id !== selectedScript.id));
    setSelectedScript(null);

    toast({
      title: "Скрипт удален",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      // Здесь будет вызов API для генерации текста
      // Имитация запроса к API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Пример сгенерированного текста (в реальном приложении заменить на данные от API)
      const generatedText =
        `Сгенерированный текст в ${
          generationParams.tone
        } тоне. Основной фокус: ${generationParams.focus || "общий"}. ` +
        "Это автоматически сгенерированный текст скрипта, который можно использовать как основу для дальнейшего редактирования.";

      setEditedContent(generatedText);
      setIsGenerateModalOpen(false);

      toast({
        title: "Текст сгенерирован",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Ошибка генерации",
        description: "Не удалось сгенерировать текст",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredScripts = scripts.filter(
    (script) =>
      script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      script.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex height="100vh" overflow="hidden" marginTop={"20px"}>
      {/* Боковая панель со списком скриптов */}
      <Box
        width="300px"
        borderRight="1px solid"
        borderColor="gray.200"
        p={1}
        overflowY="auto"
      >
        <List spacing={3}>
          {filteredScripts.map((script) => (
            <ListItem
              key={script.id}
              p={2}
              borderRadius="md"
              bg={selectedScript?.id === script.id ? "blue.50" : "transparent"}
              borderLeft={
                selectedScript?.id === script.id ? "3px solid" : "none"
              }
              borderColor="blue.500"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
              onClick={() => handleScriptSelect(script)}
            >
              <Text fontWeight="medium">{script.title}</Text>
              <Text fontSize="sm" color="gray.500">
                Версия {script.version} · {script.author}
              </Text>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Область просмотра и редактирования */}
      <Box flex={1} p={6} overflowY="auto">
        {selectedScript ? (
          <>
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Heading size="lg" mb={2}>
                  {selectedScript.title}
                </Heading>
                <Text color="gray.500">
                  Версия {selectedScript.version} · Автор:{" "}
                  {selectedScript.author} · Последнее изменение:{" "}
                  {selectedScript.lastModified}
                </Text>
              </Box>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    icon={<FiEdit />}
                    onClick={() => setIsEditing(true)}
                  >
                    Редактировать
                  </MenuItem>
                  <MenuItem icon={<FiTrash2 />} onClick={handleDelete}>
                    Удалить
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Divider mb={6} />

            {isEditing ? (
              <>
                <Flex mb={4} gap={3}>
                  <Button
                    leftIcon={<FiRefreshCw />}
                    variant="outline"
                    onClick={() => setIsGenerateModalOpen(true)}
                  >
                    Сгенерировать текст
                  </Button>
                </Flex>

                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  height="400px"
                  mb={4}
                  fontFamily="monospace"
                />
                <Flex gap={3}>
                  <Button
                    leftIcon={<FiSave />}
                    colorScheme="blue"
                    onClick={handleSave}
                  >
                    Сохранить новую версию
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Отменить
                  </Button>
                </Flex>
              </>
            ) : (
              <Box
                whiteSpace="pre-wrap"
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                bg="white"
              >
                {selectedScript.content}
              </Box>
            )}
          </>
        ) : (
          <Box textAlign="center" pt={20}>
            <Text fontSize="xl" color="gray.500">
              Выберите скрипт из списка для просмотра или редактирования
            </Text>
          </Box>
        )}
      </Box>

      {/* Модальное окно генерации текста */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Генерация текста скрипта</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Тон общения</FormLabel>
              <Select
                value={generationParams.tone}
                onChange={(e) =>
                  setGenerationParams({
                    ...generationParams,
                    tone: e.target.value,
                  })
                }
              >
                <option value="formal">Официальный</option>
                <option value="friendly">Дружелюбный</option>
                <option value="persuasive">Убедительный</option>
                <option value="consultative">Консультативный</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Длина текста</FormLabel>
              <Select
                value={generationParams.length}
                onChange={(e) =>
                  setGenerationParams({
                    ...generationParams,
                    length: e.target.value,
                  })
                }
              >
                <option value="short">Короткий</option>
                <option value="medium">Средний</option>
                <option value="long">Длинный</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Основной фокус (необязательно)</FormLabel>
              <Input
                placeholder="Например: обработка возражений о цене"
                value={generationParams.focus}
                onChange={(e) =>
                  setGenerationParams({
                    ...generationParams,
                    focus: e.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              onClick={() => setIsGenerateModalOpen(false)}
            >
              Отмена
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleGenerate}
              isLoading={isGenerating}
              loadingText="Генерация..."
              leftIcon={!isGenerating ? <FiRefreshCw /> : undefined}
            >
              Сгенерировать
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default ScriptsPanel;
