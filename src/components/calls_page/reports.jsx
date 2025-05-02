import { Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import TableReport from "./table_report";
import { observer } from "mobx-react-lite";

const Reports = observer(() => {
  return (
    <VStack width={"100%"}>
      <Stack w={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack>
      <Stack marginTop={"10px"} width={"100%"}>
        <TableReport />
      </Stack>
    </VStack>
  );
});

export default Reports;
