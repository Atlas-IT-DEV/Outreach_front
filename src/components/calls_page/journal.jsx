import { HStack, Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import ModalJournalFilter from "./modal_journal_filter";
import CallsJournal from "./calls_journal";
import TableCalls from "./table_calls";

const Journal = () => {
  return (
    <VStack width={"100%"}>
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher />
        <ModalJournalFilter />
      </HStack>
      <CallsJournal />
      <Stack width={"100%"} marginTop={"20px"}>
        <TableCalls />
      </Stack>
    </VStack>
  );
};

export default Journal;
