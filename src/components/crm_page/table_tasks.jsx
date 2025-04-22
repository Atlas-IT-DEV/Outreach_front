import { HStack, Text, VStack } from "@chakra-ui/react";
import TaskCard from "./task_card";

const TableTasks = () => {
  return (
    <VStack width={"100%"} align={"flex-start"}>
      {/* <HStack> */}
      <HStack
        width={"100%"}
        justify={"space-between"}
        align={"flex-start"}
        overflow={"hidden"}
        overflowX={"scroll"}
      >
        <VStack width={"100%"} padding={"10px"} gap={"10px"}>
          <Text
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            Просроченные
          </Text>
          <TaskCard />
          <TaskCard />
        </VStack>
        <VStack width={"100%"} padding={"10px"} gap={"10px"}>
          <Text
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            На сегодня
          </Text>
          <TaskCard />
        </VStack>
        <VStack width={"100%"} padding={"10px"} gap={"10px"}>
          <Text
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            На завтра
          </Text>
          <TaskCard />
        </VStack>
        <VStack width={"100%"} padding={"10px"} gap={"10px"}>
          <Text
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            На будущее
          </Text>
          <TaskCard />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default TableTasks;
