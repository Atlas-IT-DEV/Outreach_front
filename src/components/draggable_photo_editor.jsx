import React, { useEffect, useState } from "react";
import { ChakraProvider, Box, Image, Flex } from "@chakra-ui/react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { VStack, Input } from "@chakra-ui/react";

// Тип для Drag-and-Drop
const ITEM_TYPE = "PHOTO";

// Исходные данные: массив с URL фотографий
const initialPhotos = [
  { id: 1, src: "https://via.placeholder.com/150?text=Photo+1" },
  { id: 2, src: "https://via.placeholder.com/150?text=Photo+2" },
  { id: 3, src: "https://via.placeholder.com/150?text=Photo+3" },
  { id: 4, src: "https://via.placeholder.com/150?text=Photo+4" },
  { id: 5, src: "https://via.placeholder.com/150?text=Photo+5" },
];

// Компонент для перетаскиваемой фотографии
const DraggablePhoto = ({
  photo,
  index,
  movePhoto,
  setAdditionalFiles,
  array,
}) => {
  const [, ref] = useDrag({
    type: ITEM_TYPE,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        movePhoto(draggedItem.index, index);
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
    >
      <VStack>
        {" "}
        <Image
          src={
            typeof photo?.url == "object"
              ? URL.createObjectURL(photo?.url)
              : photo?.url
          }
          boxSize="150px"
          objectFit="cover"
        />
        <Box width="150px" textAlign="center">
          <Input
            value={photo?.color}
            onChange={(e) => {
              let copy_array = Array.from(array);
              copy_array[index].color = e.target.value;
              setAdditionalFiles(copy_array);
            }}
          />
        </Box>
      </VStack>
    </Box>
  );
};

const DraggablePhotoGallery = ({
  photos,
  setPhotos,
  setFilesAdded,
  files_added,
}) => {
  const movePhoto = (fromIndex, toIndex) => {
    !files_added && setFilesAdded(true);
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedPhoto);
    console.log(updatedPhotos);
    setPhotos(updatedPhotos);
  };

  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <Box maxWidth="100%" margin="auto">
          <Flex
            gap={4}
            overflowX="auto"
            p={2}
            border="1px solid lightgray"
            borderRadius="md"
          >
            {photos?.map((photo, index, array) => (
              <DraggablePhoto
                key={photo.id}
                photo={photo}
                index={index}
                setAdditionalFiles={setPhotos}
                movePhoto={movePhoto}
                array={array}
              />
            ))}
          </Flex>
        </Box>
      </DndProvider>
    </ChakraProvider>
  );
};

export default DraggablePhotoGallery;
