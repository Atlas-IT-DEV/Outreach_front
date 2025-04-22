import { HStack, Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import TableCalls from "./table_calls";
import CallsStatistic from "./calls_journal";
import ModalCreateWork from "./modal_create_work";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const Journal = observer(() => {
  const { pageStore } = useStores();
  const options = {
    keys: ["name", "description"], // Поля для поиска
    threshold: 0, // 0 = точное совпадение, 1 = любые совпадения
  };
  return (
    <VStack width={"100%"}>
      <CallsStatistic />
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher array={pageStore.call_works} options={options} />
      </HStack>
      <HStack width={"100%"} marginTop={"20px"} justify={"flex-end"}>
        <ModalCreateWork />
      </HStack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableCalls />
      </Stack>
    </VStack>
  );
});

export default Journal;
