import { HStack, Stack, VStack } from "@chakra-ui/react";
import TableScripts from "../table_scripts";
import Searcher from "../searcher";
import ModalNewScript from "./modal_new_script";
import { observer } from "mobx-react-lite";

const Scripts = observer(() => {
  return (
    <VStack width={"100%"}>
      {/* <Stack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack> */}
      <HStack width={"100%"} justify={"flex-end"} marginTop={"20px"}>
        <ModalNewScript />
      </HStack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableScripts type="calls" />
      </Stack>
    </VStack>
  );
});

export default Scripts;
