import { Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import TableJournal from "./table_journal";

const Journal = () => {
  return (
    <VStack width={"100%"}>
      <Stack w={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableJournal />
      </Stack>
    </VStack>
  );
};

export default Journal;
