import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const AutomationPage = () => {
  const [selected, setSelected] = useState([1, 0, 0, 0, 0]);

  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden scroll"}
      align={"flex-start"}
      marginLeft={"280px"}
      padding={"40px"}
    >
      <HStack width={"80%"} gap={"10px"} justify={"space-between"}>
        <VStack>
          <Stack
            borderRadius={"100px"}
            width={"50px"}
            height={"50px"}
            border={selected[0] == 1 ? "1px solid #4682B4" : "1px solid black"}
            justify={"center"}
            align={"center"}
            bg={selected[0] == 1 ? "#4682B4" : "none"}
            color={selected[0] == 1 ? "white" : "black"}
            fontWeight={"600"}
            fontSize={"20px"}
          >
            <Text>1</Text>
          </Stack>
          <Text ontWeight={"600"} fontSize={"20px"}>
            Автоматизация
          </Text>
        </VStack>
        <VStack>
          <Stack
            borderRadius={"100px"}
            width={"50px"}
            height={"50px"}
            border={selected[1] == 1 ? "1px solid #4682B4" : "1px solid black"}
            justify={"center"}
            align={"center"}
            bg={selected[1] == 1 ? "#4682B4" : "none"}
            color={selected[1] == 1 ? "white" : "black"}
            fontWeight={"600"}
            fontSize={"20px"}
          >
            <Text>2</Text>
          </Stack>
          <Text ontWeight={"600"} fontSize={"20px"}>
            Выбор базы
          </Text>
        </VStack>
        <VStack>
          <Stack
            borderRadius={"100px"}
            width={"50px"}
            height={"50px"}
            border={selected[2] == 1 ? "1px solid #4682B4" : "1px solid black"}
            justify={"center"}
            align={"center"}
            bg={selected[2] == 1 ? "#4682B4" : "none"}
            color={selected[2] == 1 ? "white" : "black"}
            fontWeight={"600"}
            fontSize={"20px"}
          >
            <Text>3</Text>
          </Stack>
          <Text ontWeight={"600"} fontSize={"20px"}>
            Настройка
          </Text>
        </VStack>
        <VStack>
          <Stack
            borderRadius={"100px"}
            width={"50px"}
            height={"50px"}
            border={selected[3] == 1 ? "1px solid #4682B4" : "1px solid black"}
            justify={"center"}
            align={"center"}
            bg={selected[3] == 1 ? "#4682B4" : "none"}
            color={selected[3] == 1 ? "white" : "black"}
            fontWeight={"600"}
            fontSize={"20px"}
          >
            <Text>4</Text>
          </Stack>
          <Text ontWeight={"600"} fontSize={"20px"}>
            Запуск
          </Text>
        </VStack>
        <VStack>
          <Stack
            borderRadius={"100px"}
            width={"50px"}
            height={"50px"}
            border={selected[4] == 1 ? "1px solid #4682B4" : "1px solid black"}
            justify={"center"}
            align={"center"}
            bg={selected[4] == 1 ? "#4682B4" : "none"}
            color={selected[4] == 1 ? "white" : "black"}
            fontWeight={"600"}
            fontSize={"20px"}
          >
            <Text>5</Text>
          </Stack>
          <Text ontWeight={"600"} fontSize={"20px"}>
            Отчёт
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default AutomationPage;
