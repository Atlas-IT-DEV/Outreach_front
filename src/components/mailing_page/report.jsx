import { Stack, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableReport from "./table_report";

const Report = () => {
  return (
    <VStack width={"100%"}>
      <Stack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableReport />
      </Stack>
    </VStack>
  );
};

export default Report;
