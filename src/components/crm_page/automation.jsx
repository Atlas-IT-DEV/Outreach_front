import { HStack, Text, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";
import { observer } from "mobx-react-lite";

const Automation = observer(() => {
  return (
    <VStack width={"100%"}>
      <Searcher search_by="Поиск по чему то там" />
    </VStack>
  );
});

export default Automation;
