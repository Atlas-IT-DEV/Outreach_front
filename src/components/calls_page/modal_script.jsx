import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import useWindowDimensions from "../../windowDimensions";

const ModalScript = ({ obj = {} }) => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        onClick={() => {
          pageStore.updateSelectedScript(obj);
          onOpen();
        }}
        bg={
          pageStore.selected_script?.id == obj?.id
            ? "rgba(200,200,200,0.5)"
            : null
        }
        padding={"10px 5px"}
        width={"100%"}
        justify={"space-between"}
        borderBottom={"1px solid black"}
        cursor={"pointer"}
        _hover={{
          bg: "rgba(200,200,200,0.5)",
        }}
      >
        <Text color={"black"}>{obj?.templateName}</Text>
        {obj?.is_fav ? (
          <MdOutlineStar size={"30px"} color="#4682B4" />
        ) : (
          <MdOutlineStarBorder size={"30px"} color="#4682B4" />
        )}
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} size={"full"} placement="right">
        <DrawerContent
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <DrawerCloseButton
            onClick={() => pageStore.updateSelectedScript({})}
          />
          <VStack
            width={"100%"}
            height={"auto"}
            minH={"100vh"}
            overflow={"hidden"}
            overflowY={"scroll"}
            padding={"20px"}
            fontWeight={"600"}
          >
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Цель рассылки</Text>
              <Input
                placeholder="Цель рассылки"
                value={pageStore.selected_script?.purpose}
              />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Целевая аудитория</Text>
              <Input
                placeholder="Целевая аудитория"
                value={pageStore.selected_script?.targetAudience}
              />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Предложение/продукт</Text>
              <Input placeholder="Предложение/продукт" />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Целевое действие</Text>
              <Input
                placeholder="Целевое действие"
                value={pageStore.selected_script?.targetAction}
              />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Образ автора</Text>
              <Input
                placeholder="Образ автора"
                value={pageStore.selected_script?.authorImage}
              />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Прочее</Text>
              <Textarea placeholder="Прочее" />
            </VStack>

            <VStack align={"flex-start"} width={"100%"}>
              <Text>Название</Text>
              <Input
                placeholder="Название"
                value={pageStore.selected_script?.templateName}
              />
            </VStack>
            <VStack align={"flex-start"} width={"100%"}>
              <Text>Текст рассылки</Text>
              <Textarea
                placeholder="Текст рассылки"
                height={width >= 1400 ? "420px" : "200px"}
                value={pageStore.selected_script?.message}
              />
            </VStack>

            <Stack
              width={"100%"}
              justify={"flex-end"}
              flexDirection={width >= 600 ? "row" : "column"}
              gap={0}
            >
              <Button
                marginTop={"10px"}
                boxShadow={"-2px 2px 0 0 #4682B4"}
                borderRadius={"0px"}
                border={"1px solid #4682B4"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "#4682B4", color: "white" }}
                flexShrink={width >= 600 ? 0 : 1}
              >
                <Text fontSize={width >= 1000 ? "16px" : "14px"}>
                  Сгенерировать текст рассылки
                </Text>
              </Button>
              <Button
                marginTop={"10px"}
                boxShadow={"-2px 2px 0 0 #4682B4"}
                borderRadius={"0px"}
                border={"1px solid #4682B4"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "#4682B4", color: "white" }}
                flexShrink={width >= 600 ? 0 : 1}
              >
                <Text fontSize={width >= 1000 ? "16px" : "14px"}>
                  Сохранить
                </Text>
              </Button>
            </Stack>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ModalScript;
