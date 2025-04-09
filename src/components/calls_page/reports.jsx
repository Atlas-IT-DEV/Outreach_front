import { HStack, Stack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import ModalNewScript from "./modal_new_script";
import TableReport from "./table_report";

const Reports = () => {
  return (
    <VStack width={"100%"}>
      <Stack w={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack>
      <HStack w={"100%"} justify={"flex-end"} marginTop={"10px"}>
        <ModalNewScript />
      </HStack>
      <Stack marginTop={"10px"} width={"100%"}>
        <TableReport />
      </Stack>
    </VStack>
  );
};
export default Reports;
