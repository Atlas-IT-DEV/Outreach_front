import { HStack, Stack, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableTasks from "./table_tasks";

const Tasks = () => {
  return (
    <VStack width={"100%"}>
      <HStack width={"100%"} marginTop={"20px"}>
        <Searcher />
      </HStack>

      <Stack marginTop={"20px"} w={"100%"}>
        <TableTasks />
      </Stack>
    </VStack>
  );
};

export default Tasks;
