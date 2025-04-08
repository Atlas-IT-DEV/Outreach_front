import { HStack, VStack } from "@chakra-ui/react";
import Searcher from "../searcher";

const Automation = () => {
  return (
    <VStack width={"100%"}>
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </HStack>
    </VStack>
  );
};

export default Automation;
