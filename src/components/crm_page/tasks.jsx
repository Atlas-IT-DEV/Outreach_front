import { HStack, Stack, Text, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableTasks from "./table_tasks";

const Tasks = () => {
  return (
    <VStack width={"100%"}>
      <Text marginTop={"20px"} fontWeight={"600"} color={"black"} w={"100%"}>
        Поиск по задачам
      </Text>
      <HStack width={"100%"}>
        <Searcher />
      </HStack>
      <Stack marginTop={"10px"} w={"100%"}>
        <TableTasks />
      </Stack>
    </VStack>
  );
};

export default Tasks;
