import { HStack, Stack, VStack } from "@chakra-ui/react";
import TableScripts from "../table_scripts";
import Searcher from "../searcher";
import { observer } from "mobx-react-lite";
import ModalCreateScript from "./modal_create_script";

const Scripts = observer(() => {
  return (
    <VStack width={"100%"}>
      {/* <Stack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </Stack> */}
      <HStack width={"100%"} justify={"flex-end"} marginTop={"20px"}>
        <ModalCreateScript />
      </HStack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableScripts type="mail" />
      </Stack>
    </VStack>
  );
});

export default Scripts;
