import {
  Box,
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
  Badge,
} from "@chakra-ui/react";
import { FaBook, FaCheck } from "react-icons/fa";
import ReactPlayer from "react-player";
import HLSPlayer from "./hls_player";
import { useState, useEffect } from "react";
import { useStores } from "../store/store_context";
import VideoPlayer from "./hls_player";
const LessonDropdown = ({
  title,
  position,
  videoUrl,
  description,
  isCompleted,
  onComplete,
  onResume,
}) => {
  const { pageStore } = useStores();
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
            <Text fontSize={20} fontWeight={"bold"} color={"#4682B4"}>
              {position}.
            </Text>
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="md" fontWeight="bold">
                {title}
              </Text>
            </VStack>
          </HStack>
          {isCompleted && (
            <Badge backgroundColor={"#4682B4"} color={"white"} mr={4}>
              Изучено
            </Badge>
          )}
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <VStack align="start" spacing={4} width="100%">
            <Box width="100%" borderRadius="md" overflow="hidden">
              <VideoPlayer userId={pageStore.user_data.id} videoId={videoUrl} />
            </Box>
            <Text fontSize="sm">{description}</Text>
          </VStack>

          <VStack width="100%" spacing={2} mt={4}>
            <Button
              leftIcon={<FaCheck />}
              backgroundColor="#4682B4"
              width="100%"
              onClick={onComplete}
              color={"white"}
              disabled={isCompleted}
            >
              Изучено
            </Button>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default LessonDropdown;
