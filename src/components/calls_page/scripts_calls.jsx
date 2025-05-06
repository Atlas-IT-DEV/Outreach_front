import {
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { MdOutlineStarBorder, MdOutlineStar } from "react-icons/md";

const Patterns = observer(() => {
  return (
    <VStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
      <HStack width={"100%"} justify={"space-between"} align={"flex-start"}>
        <VStack width={"40%"} padding={"10px"}>
          <Text fontWeight={"600"} color={"black"}>
            Скрипты
          </Text>
          <HStack
            marginTop={"10px"}
            width={"100%"}
            justify={"space-between"}
            borderBottom={"1px solid black"}
            cursor={"pointer"}
          >
            <Text color={"black"}>Приветственное</Text>
            <MdOutlineStar size={"30px"} color="rgba(48, 141, 218, 1)" />
          </HStack>
          <HStack
            marginTop={"10px"}
            width={"100%"}
            justify={"space-between"}
            borderBottom={"1px solid black"}
            cursor={"pointer"}
          >
            <Text color={"black"}>Приветственное</Text>
            <MdOutlineStarBorder size={"30px"} color="rgba(48, 141, 218, 1)" />
          </HStack>
        </VStack>
        <HStack
          justify={"space-between"}
          align={"flex-start"}
          width={"60%"}
          padding={"20px"}
          gap={"10px"}
          border={"2px solid rgba(48, 141, 218, 1)"}
        >
          <VStack
            width={"40%"}
            align={"flex-start"}
            gap={"10px"}
            marginTop={"10px"}
            color={"black"}
            fontWeight={"600"}
          >
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Цель рассылки</Text>
              <Input placeholder="Цель рассылки" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Целевая аудитория</Text>
              <Input placeholder="Целевая аудитория" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Предложение/продукт</Text>
              <Input placeholder="Предложение/продукт" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Целевое действие</Text>
              <Input placeholder="Целевое действие" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Образ автора</Text>
              <Input placeholder="Образ автора" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Прочее</Text>
              <Textarea placeholder="Прочее" />
            </VStack>
          </VStack>
          <VStack width={"60%"} align={"flex-start"} fontWeight={"600"}>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Название</Text>
              <Input placeholder="Название" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Текст рассылки</Text>
              <Textarea placeholder="Текст рассылки" height={"420px"} />
            </VStack>

            <HStack width={"100%"} justify={"flex-end"}>
              <Button
                marginTop={"10px"}
                
                borderRadius={"8px"}
                border={"2px solid rgba(48, 141, 218, 1)"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                flexShrink={0}
              >
                <Text>Перейти к генерации рассылки</Text>
              </Button>
              <Button
                marginTop={"10px"}
                
                borderRadius={"8px"}
                border={"2px solid rgba(48, 141, 218, 1)"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                flexShrink={0}
              >
                <Text>Сохранить</Text>
              </Button>
            </HStack>
          </VStack>
        </HStack>
      </HStack>
    </VStack>
  );
});

export default Patterns;
