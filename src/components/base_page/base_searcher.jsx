import { Button, HStack, Input, Text, Tooltip, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import useWindowDimensions from "../../windowDimensions";

const BaseSearcher = observer(() => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();

  return (
    <VStack width={"100%"} align={"flex-start"} justify={"flex-start"}>
      <Text fontWeight={"600"} color={"black"}>
        Поиск по базе
      </Text>
      <HStack width={"100%"}>
        <Tooltip
          label={"Подсказка: Вы можете делать поиск по любым полям"}
          bg={"rgba(48, 141, 218, 1)"}
          color={"white"}
          borderRadius={"10px"}
          placement="bottom-start"
        >
          <Input
            value={pageStore.searchBaseValue}
            onChange={async (e) => {
              pageStore.updateSearchBaseValue(
                e.target.value.replace(/\s/g, "")
              );
            }}
            width={"100%"}
            border={"2px solid rgba(48, 141, 218, 1)"}
            borderRadius={"8px"}
            _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
            placeholder="Поиск"
          />
        </Tooltip>
        <Button
          border={"2px solid rgba(48, 141, 218, 1)"}
          borderRadius={"8px"}
          flexShrink={0}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
          onClick={async () => {
            pageStore.updateClickSearch(true);
            await pageStore.searchInBase(pageStore.searchBaseValue, 0, 20);
          }}
        >
          <Text fontSize={width >= 1000 ? "16px" : "14px"}>Найти</Text>
        </Button>
        <Button
          border={"2px solid rgba(48, 141, 218, 1)"}
          borderRadius={"8px"}
          bg={"white"}
          flexShrink={0}
          color={"black"}
          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
          onClick={async () => {
            pageStore.updateClickSearch(false);
            pageStore.updateSearchBaseValue("");
            pageStore.updateSearchElement([]);
          }}
        >
          <Text fontSize={width >= 1000 ? "16px" : "14px"}>Очистить</Text>
        </Button>
      </HStack>
    </VStack>
  );
});

export default BaseSearcher;
