import { HStack, Stack, VStack } from "@chakra-ui/react";

import Searcher from "../searcher";
import TableTasks from "./table_tasks";
import ModalCreateTask from "./modal_create_task";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const Tasks = observer(() => {
  const { pageStore } = useStores();
  const options = {
    keys: ["name", "description"],
    threshold: 0, // 0 = точное совпадение, 1 = любые совпадения
  };
  return (
    <VStack width={"100%"}>
      <HStack width={"100%"}>
        <Searcher
          search_by="Поиск по задачам"
          array={pageStore.tasks}
          options={options}
        />
      </HStack>
      <HStack width={"100%"} align={"flex-start"} marginTop={"20px"}>
        <ModalCreateTask />
      </HStack>
      <Stack marginTop={"10px"} w={"100%"}>
        <TableTasks />
      </Stack>
    </VStack>
  );
});

export default Tasks;
