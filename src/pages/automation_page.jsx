import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useWindowDimensions from "../windowDimensions";
import { observer } from "mobx-react-lite";

const AutomationPage = observer(() => {
  const [selected, setSelected] = useState([1, 0, 0, 0, 0]);
  const { width } = useWindowDimensions();

  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden"}
      align={"flex-start"}
      marginLeft={width >= 1400 ? "280px" : 0}
      padding={width >= 1400 ? "40px" : ["10px", "20px"]}
      marginTop={width >= 1400 ? "10px" : ["40px", "30px"]}
    >
      {width >= 900 ? (
        <HStack
          width={"100%"}
          gap={"10px"}
          justify={"space-between"}
          margin={width >= 1400 ? "0 auto" : 0}
        >
          <VStack cursor={"pointer"}>
            <Stack
              borderRadius={"100px"}
              width={"50px"}
              height={"50px"}
              border={
                selected[0] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
              }
              justify={"center"}
              align={"center"}
              bg={selected[0] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
              color={selected[0] == 1 ? "white" : "black"}
              fontWeight={"600"}
              fontSize={"20px"}
            >
              <Text>1</Text>
            </Stack>
            <Text ontWeight={"600"} fontSize={width >= 1400 ? "20px" : "14px"}>
              Автоматизация
            </Text>
          </VStack>
          <VStack cursor={"pointer"}>
            <Stack
              borderRadius={"100px"}
              width={"50px"}
              height={"50px"}
              border={
                selected[1] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
              }
              justify={"center"}
              align={"center"}
              bg={selected[1] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
              color={selected[1] == 1 ? "white" : "black"}
              fontWeight={"600"}
              fontSize={"20px"}
            >
              <Text>2</Text>
            </Stack>
            <Text
              ontWeight={"600"}
              fontSize={width >= 1400 ? "20px" : "14px"}
              width={"max-content"}
            >
              Выбор базы
            </Text>
          </VStack>
          <VStack cursor={"pointer"}>
            <Stack
              borderRadius={"100px"}
              width={"50px"}
              height={"50px"}
              border={
                selected[2] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
              }
              justify={"center"}
              align={"center"}
              bg={selected[2] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
              color={selected[2] == 1 ? "white" : "black"}
              fontWeight={"600"}
              fontSize={"20px"}
            >
              <Text>3</Text>
            </Stack>
            <Text ontWeight={"600"} fontSize={width >= 1400 ? "20px" : "14px"}>
              Настройка
            </Text>
          </VStack>
          <VStack cursor={"pointer"}>
            <Stack
              borderRadius={"100px"}
              width={"50px"}
              height={"50px"}
              border={
                selected[3] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
              }
              justify={"center"}
              align={"center"}
              bg={selected[3] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
              color={selected[3] == 1 ? "white" : "black"}
              fontWeight={"600"}
              fontSize={"20px"}
            >
              <Text>4</Text>
            </Stack>
            <Text ontWeight={"600"} fontSize={width >= 1400 ? "20px" : "14px"}>
              Запуск
            </Text>
          </VStack>
          <VStack cursor={"pointer"}>
            <Stack
              borderRadius={"100px"}
              width={"50px"}
              height={"50px"}
              border={
                selected[4] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
              }
              justify={"center"}
              align={"center"}
              bg={selected[4] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
              color={selected[4] == 1 ? "white" : "black"}
              fontWeight={"600"}
              fontSize={"20px"}
            >
              <Text>5</Text>
            </Stack>
            <Text ontWeight={"600"} fontSize={width >= 1400 ? "20px" : "14px"}>
              Отчёт
            </Text>
          </VStack>
        </HStack>
      ) : (
        <VStack width={"100%"}>
          <HStack
            width={"100%"}
            gap={["40px"]}
            justify={"center"}
            margin={width >= 1400 ? "0 auto" : 0}
          >
            <VStack cursor={"pointer"} justify={"center"}>
              <Stack
                borderRadius={"100px"}
                width={"50px"}
                height={"50px"}
                border={
                  selected[0] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
                }
                justify={"center"}
                align={"center"}
                bg={selected[0] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
                color={selected[0] == 1 ? "white" : "black"}
                fontWeight={"600"}
                fontSize={"20px"}
              >
                <Text>1</Text>
              </Stack>
              <Text
                ontWeight={"600"}
                fontSize={width >= 1400 ? "20px" : "14px"}
              >
                Автоматизация
              </Text>
            </VStack>
            <VStack cursor={"pointer"}>
              <Stack
                borderRadius={"100px"}
                width={"50px"}
                height={"50px"}
                border={
                  selected[1] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
                }
                justify={"center"}
                align={"center"}
                bg={selected[1] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
                color={selected[1] == 1 ? "white" : "black"}
                fontWeight={"600"}
                fontSize={"20px"}
              >
                <Text>2</Text>
              </Stack>
              <Text
                ontWeight={"600"}
                fontSize={width >= 1400 ? "20px" : "14px"}
                width={"max-content"}
              >
                Выбор базы
              </Text>
            </VStack>
            <VStack cursor={"pointer"}>
              <Stack
                borderRadius={"100px"}
                width={"50px"}
                height={"50px"}
                border={
                  selected[2] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
                }
                justify={"center"}
                align={"center"}
                bg={selected[2] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
                color={selected[2] == 1 ? "white" : "black"}
                fontWeight={"600"}
                fontSize={"20px"}
              >
                <Text>3</Text>
              </Stack>
              <Text
                ontWeight={"600"}
                fontSize={width >= 1400 ? "20px" : "14px"}
              >
                Настройка
              </Text>
            </VStack>
          </HStack>
          <HStack
            width={"100%"}
            gap={"80px"}
            justify={"center"}
            marginTop={"20px"}
          >
            <VStack cursor={"pointer"}>
              <Stack
                borderRadius={"100px"}
                width={"50px"}
                height={"50px"}
                border={
                  selected[3] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
                }
                justify={"center"}
                align={"center"}
                bg={selected[3] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
                color={selected[3] == 1 ? "white" : "black"}
                fontWeight={"600"}
                fontSize={"20px"}
              >
                <Text>4</Text>
              </Stack>
              <Text
                ontWeight={"600"}
                fontSize={width >= 1400 ? "20px" : "14px"}
              >
                Запуск
              </Text>
            </VStack>
            <VStack cursor={"pointer"}>
              <Stack
                borderRadius={"100px"}
                width={"50px"}
                height={"50px"}
                border={
                  selected[4] == 1 ? "1px solid rgba(48, 141, 218, 1)" : "1px solid black"
                }
                justify={"center"}
                align={"center"}
                bg={selected[4] == 1 ? "rgba(48, 141, 218, 1)" : "none"}
                color={selected[4] == 1 ? "white" : "black"}
                fontWeight={"600"}
                fontSize={"20px"}
              >
                <Text>5</Text>
              </Stack>
              <Text
                ontWeight={"600"}
                fontSize={width >= 1400 ? "20px" : "14px"}
              >
                Отчёт
              </Text>
            </VStack>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
});

export default AutomationPage;
