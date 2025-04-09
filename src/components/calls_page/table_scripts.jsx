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
import { useStores } from "../../store/store_context";

const TableScripts = observer(() => {
  const { pageStore } = useStores();
  return (
    <VStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
      <HStack width={"100%"} justify={"space-between"} align={"flex-start"}>
        <VStack width={"40%"} padding={"10px"}>
          <Text fontWeight={"600"} color={"black"}>
            Шаблоны
          </Text>
          {pageStore.emailTemplates?.length > 0
            ? pageStore.emailTemplates?.map((item, index) => (
                <HStack
                  key={index}
                  onClick={() => pageStore.updateSelectedScript(item)}
                  bg={
                    pageStore.selected_script?.id == item?.id
                      ? "rgba(200,200,200,0.5)"
                      : null
                  }
                  marginTop={"10px"}
                  width={"100%"}
                  justify={"space-between"}
                  borderBottom={"1px solid black"}
                  cursor={"pointer"}
                  _hover={{
                    bg: "rgba(200,200,200,0.5)",
                  }}
                >
                  <Text color={"black"}>{item?.templateName}</Text>
                  {item?.is_fav ? (
                    <MdOutlineStar size={"30px"} color="#4682B4" />
                  ) : (
                    <MdOutlineStarBorder size={"30px"} color="#4682B4" />
                  )}
                </HStack>
              ))
            : null}
        </VStack>
        <HStack
          justify={"space-between"}
          align={"flex-start"}
          width={"60%"}
          padding={"20px"}
          gap={"10px"}
          border={"2px solid #4682B4"}
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
          </VStack>
          <VStack width={"60%"} align={"flex-start"} fontWeight={"600"}>
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
                height={"420px"}
                value={pageStore.selected_script?.message}
              />
            </VStack>

            <HStack width={"100%"} justify={"flex-end"}>
              <Button
                marginTop={"10px"}
                boxShadow={"-2px 2px 0 0 #4682B4"}
                borderRadius={"0px"}
                border={"1px solid #4682B4"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "#4682B4", color: "white" }}
                flexShrink={0}
              >
                <Text>Сгенерировать текст рассылки</Text>
              </Button>
              <Button
                marginTop={"10px"}
                boxShadow={"-2px 2px 0 0 #4682B4"}
                borderRadius={"0px"}
                border={"1px solid #4682B4"}
                bg={"white"}
                color={"black"}
                _hover={{ bg: "#4682B4", color: "white" }}
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

export default TableScripts;
