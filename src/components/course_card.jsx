import {
  Box,
  Image,
  Text,
  Progress,
  Button,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";

const CourseCard = ({ title, lessons, progress = 0, image, onResume }) => {
  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="white"
      boxShadow="md"
      onClick={() => console.log(progress)}
      justify={"space-between"}
    >
      <Image src={image} alt={title} borderRadius="md" mb={4} />

      <VStack align="start" spacing={2} width={"100%"}>
        <Text fontSize="xs" fontWeight="bold">
          {title}
        </Text>
        <HStack>
          <Icon as={FaBook} />
          <Text fontSize="sm">{lessons} Уроков(а)</Text>
        </HStack>

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
          backgroundColor={"#4682B4"}
          w="full"
          onClick={onResume}
          color={"white"}
        >
          {progress == 0 ? "Начать" : "Продолжить"}
        </Button>
      </VStack>
    </VStack>
  );
};

export default CourseCard;
