import { HStack, Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import TableJournal from "./table_journal";
import ModalCreateWork from "./modal_create_work";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const Journal = observer(() => {
  const { pageStore } = useStores();
  const options = {
    keys: ["name", "description"], // Поля для поиска
    threshold: 0.5, // 0 = точное совпадение, 1 = любые совпадения
  };
  return (
    <VStack width={"100%"}>
      <Stack w={"100%"} marginTop={"20px"}>
        <Searcher array={pageStore.mail_works} options={options} />
      </Stack>
      <HStack width={"100%"} justify={"flex-end"} marginTop={"20px"}>
        <ModalCreateWork />
      </HStack>
      <TableJournal />
    </VStack>
  );
});

export default Journal;
