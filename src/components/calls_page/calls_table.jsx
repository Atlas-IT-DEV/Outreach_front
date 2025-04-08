import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Text,
  useColorModeValue,
  Box,
  Progress,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  HStack,
} from "@chakra-ui/react";
import { FiMoreVertical, FiCheck, FiPlus } from "react-icons/fi";

const CallsTable = () => {
  const toast = useToast();
  const rowBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Пример данных
  const callsData = [
    {
      id: 1,
      callDate: "2023-06-15 14:30",
      phoneNumber: "+7 (912) 345-67-89",
      campaign: "Летняя распродажа",
      transcription: "",
      successRate: 85,
      inCRM: false,
    },
    {
      id: 2,
      callDate: "2023-06-15 15:45",
      phoneNumber: "+7 (923) 456-78-90",
      campaign: "Акция выходного дня",
      transcription: "Клиент интересуется условиями доставки...",
      successRate: 42,
      inCRM: true,
    },
    {
      id: 3,
      callDate: "2023-06-16 10:15",
      phoneNumber: "+7 (934) 567-89-01",
      campaign: "Новые клиенты",
      transcription: "",
      successRate: 67,
      inCRM: false,
    },
  ];

  const handleTranscribe = (id) => {
    toast({
      title: "Транскрибация начата",
      description: `Запущен процесс транскрибации для звонка #${id}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    // Здесь будет логика транскрибации
  };

  const handleAddToCRM = (id) => {
    toast({
      title: "Добавлено в CRM",
      description: `Звонок #${id} успешно добавлен в CRM`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    // Здесь будет логика добавления в CRM
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={borderColor}
      marginTop={"20px"}
    >
      <Table variant="simple" size="md">
        <Thead>
          <Tr>
            <Th>Дата звонка</Th>
            <Th>Звонок</Th>
            <Th>Кампания</Th>
            <Th>Транскрибация</Th>
            <Th>% успеха</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {callsData.map((call) => (
            <Tr key={call.id} bg={rowBg}>
              <Td>{call.callDate}</Td>
              <Td>{call.phoneNumber}</Td>
              <Td>
                <Badge colorScheme="blue" variant="subtle">
                  {call.campaign}
                </Badge>
              </Td>
              <Td>
                {call.transcription ? (
                  <Text fontSize="sm" noOfLines={1}>
                    {call.transcription}
                  </Text>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => handleTranscribe(call.id)}
                  >
                    Транскрибировать
                  </Button>
                )}
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Box w="100%" maxW="100px">
                    <Progress
                      value={call.successRate}
                      size="sm"
                      colorScheme={
                        call.successRate > 75
                          ? "green"
                          : call.successRate > 50
                          ? "yellow"
                          : "red"
                      }
                      borderRadius="md"
                    />
                  </Box>
                  <Text fontSize="sm">{call.successRate}%</Text>
                </HStack>
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Действия"
                    icon={<FiMoreVertical />}
                    variant="ghost"
                    size="sm"
                  />
                  <MenuList>
                    {!call.inCRM && (
                      <MenuItem
                        icon={<FiPlus />}
                        onClick={() => handleAddToCRM(call.id)}
                      >
                        Добавить в CRM
                      </MenuItem>
                    )}
                    <MenuItem icon={<FiCheck />} isDisabled={call.inCRM}>
                      {call.inCRM ? "В CRM" : "Отметить как успешный"}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CallsTable;
