import { Stack, VStack } from "@chakra-ui/react";
import TableScripts from "../table_scripts";
import Searcher from "../searcher";

const Scripts = () => {
  return (
    <VStack width={"100%"}>
      <Stack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableScripts />
      </Stack>
    </VStack>
  );
};

export default Scripts;
