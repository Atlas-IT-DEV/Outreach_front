import { Button, HStack, Input, Text, Tooltip, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { useStores } from "../../store/store_context";
import { debounce } from "lodash";

const BaseSearcher = observer(() => {
  const [search, setSearch] = useState("");
  const { pageStore } = useStores();

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      await pageStore.searchInBase(value);
    }, 500), // Задержка 500 мс

    []
  );

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
              pageStore.updateSearchBaseValue(e.target.value.replace(/\s/g, ""));
              if (pageStore.searchBaseValue != "") {
                debouncedSearch(e.target.value.replace(/\s/g, ""));
              } else {
                pageStore.updateSearchElement([]);
              }
            }}
            width={"100%"}
            border={"2px solid rgba(48, 141, 218, 1)"}
            borderRadius={"8px"}
            _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
            placeholder="Поиск"
          />
        </Tooltip>
      </HStack>
    </VStack>
  );
});

export default BaseSearcher;
