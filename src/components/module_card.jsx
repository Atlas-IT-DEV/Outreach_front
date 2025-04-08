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
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";

const ModuleCard = ({ title, lessons, progress = 0, image, onResume }) => {
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
            <Image src={image} borderRadius="md" boxSize="50px" />
            <VStack align="start" spacing={1} flex={1}>
              <Text fontSize="md" fontWeight="bold">
                {title}
              </Text>
              <HStack>
                <Icon as={FaBook} />
                <Text fontSize="sm">{lessons} Уроков(а)</Text>
              </HStack>
            </VStack>
          </HStack>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel pb={4}>
          <VStack align="start" spacing={3} width="100%">
            <Text fontSize="xs" fontWeight="bold">
              Прогресс
            </Text>
            <Progress
              value={progress}
              size="sm"
              sx={{
                "& > div": { backgroundColor: "#4682B4 !important" },
              }}
              w="full"
            />
            <Text fontSize="sm" alignSelf="end">
              {progress}%
            </Text>

            <Button
              backgroundColor="#4682B4"
              w="full"
              onClick={onResume}
              color="white"
            >
              {progress == 0 ? "Начать" : "Продолжить"}
            </Button>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleCard;
