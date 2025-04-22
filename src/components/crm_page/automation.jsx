import { HStack, Text, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";

const Automation = () => {
  return (
    <VStack width={"100%"}>
      <Searcher search_by="Поиск по чему то там" />
    </VStack>
  );
};

export default Automation;
