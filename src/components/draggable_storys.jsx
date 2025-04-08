import React, { useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Image,
  Flex,
  IconButton,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";

// Тип для Drag-and-Drop
const ITEM_TYPE = "BLOCK";

// Компонент для перетаскиваемого блока
const DraggableBlock = ({
  block,
  index,
  moveBlock,
  updateBlock,
  removeBlock,
}) => {
  const [, ref] = useDrag({
    type: ITEM_TYPE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveBlock(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <Box
      ref={(node) => ref(drop(node))}
      boxShadow="md"
      borderRadius="md"
      flex="0 0 auto"
      cursor="grab"
      p={4}
      border="1px solid lightgray"
      position="relative"
      minWidth="250px"
      maxW={"250px"}
    >
      {/* Кнопка для удаления блока */}
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        position="absolute"
        top="4px"
        right="4px"
        onClick={() => removeBlock(index)}
        aria-label="Удалить блок"
        zIndex={9999}
      />
      {/* Поля ввода */}
      <Input
        placeholder="Link"
        value={block.link}
        onChange={(e) => updateBlock(index, { ...block, link: e.target.value })}
        mb={2}
      />
      <Box>
        <Button
          as="label"
          cursor="pointer"
          bgColor={"rgb(73, 69, 255)"}
          color={"white"}
          size="sm"
        >
          Выбрать изображение
          <Input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                updateBlock(index, { ...block, image: file });
              }
            }}
          />
        </Button>
      </Box>
      {block.image && (
        <Image
          src={
            typeof block.image == "string"
              ? block.image
              : URL.createObjectURL(block.image)
          }
          boxSize="150px"
          objectFit="cover"
          mt={2}
          borderRadius="md"
        />
      )}
    </Box>
  );
};

// Основной компонент
const DraggableStories = ({ stories, stories_ids, product_id }) => {
  const [blocks, setBlocks] = React.useState([
    { productId: "", link: "", image: null }, // Начальный пустой блок
  ]);

  // Функция для перемещения блока
  const moveBlock = (fromIndex, toIndex) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(fromIndex, 1);
    updatedBlocks.splice(toIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
  };

  // Функция для обновления данных блока
  const updateBlock = (index, updatedBlock) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = updatedBlock;
    setBlocks(updatedBlocks);
  };

  // Функция для добавления нового блока
  const addBlock = () => {
    setBlocks([...blocks, { productId: product_id, link: "", image: null }]);
  };

  // Функция для удаления блока
  const removeBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };
  useEffect(() => {
    setBlocks(stories);
  }, [stories]);
  const deleteStory = async (story_id) => {
    const response = await fetch(
      `https://apbstore.ru:8008/storis/${story_id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
        },
      }
    );
  };

  const createStory = async (elem) => {
    const formData = new FormData();
    console.log(elem);
    formData.append("ProductID", elem.productId);
    formData.append("Name", null);
    formData.append("Link", elem.link);
    formData.append(
      "image",
      typeof elem.image == "string"
        ? await urlToFile(
            elem.image,
            `${crypto.randomUUID()}.${
              elem.image.split(".")[elem.image.split(".").length - 1]
            }`,
            "image/jpeg"
          )
        : elem.image
    );

    try {
      const response = await fetch("https://apbstore.ru:8008/storis/", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Story created successfully:", data);
    } catch (error) {
      console.error("Failed to create story:", error);
    }
  };

  async function urlToFile(url, filename, mimeType) {
    // Шаг 1: Получаем содержимое файла по URL
    const response = await fetch(url);
    const blob = await response.blob();

    // Шаг 2: Создаём объект File из Blob
    const file = new File([blob], filename, { type: mimeType });
    return file;
  }

  const handleSubmit = async () => {
    await Promise.all(stories_ids.map((elem) => deleteStory(elem)));
    await Promise.all(blocks.map((elem) => createStory(elem)));
  };

  return (
    <ChakraProvider>
      <VStack width={"100%"}>
        <DndProvider backend={HTML5Backend}>
          <Box maxWidth="100%" margin="auto">
            <Flex
              gap={4}
              overflowX="auto"
              p={2}
              border="1px solid lightgray"
              borderRadius="md"
              alignItems="center"
            >
              {blocks.map((block, index) => (
                <DraggableBlock
                  key={index}
                  block={block}
                  index={index}
                  moveBlock={moveBlock}
                  updateBlock={updateBlock}
                  removeBlock={removeBlock}
                />
              ))}
              {/* Кнопка добавления нового блока */}
              <Box>
                <IconButton
                  icon={<AddIcon />}
                  bgColor={"rgb(73, 69, 255)"}
                  color={"white"}
                  onClick={addBlock}
                  aria-label="Добавить блок"
                  borderRadius="md"
                />
              </Box>
            </Flex>
          </Box>
        </DndProvider>
        <Button
          bgColor={"rgb(73, 69, 255)"}
          color={"white"}
          alignSelf={"flex-start"}
          onClick={() => {
            handleSubmit();
          }}
        >
          Сохранить сторисы
        </Button>
      </VStack>
    </ChakraProvider>
  );
};

export default DraggableStories;
