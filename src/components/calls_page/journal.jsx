import { HStack, Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import TableCalls from "./table_calls";
import CallsStatistic from "./calls_journal";

const Journal = () => {
  return (
    <VStack width={"100%"}>
      <CallsStatistic />
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </HStack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableCalls />
      </Stack>
    </VStack>
  );
};

export default Journal;
