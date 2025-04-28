import { HStack, Text, VStack } from "@chakra-ui/react";
import TaskCard from "./task_card";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";

const TableTasks = observer(() => {
  const { pageStore } = useStores();
  function distributeTasks(tasks) {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0); // Начало текущего дня

    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1); // Конец текущего дня (начало завтра)

    const tomorrowEnd = new Date(todayEnd);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1); // Конец завтрашнего дня

    const dayAfterTomorrowEnd = new Date(tomorrowEnd);
    dayAfterTomorrowEnd.setDate(dayAfterTomorrowEnd.getDate() + 1); // Конец послезавтра

    const result = {
      overdue: [], // Просроченные
      today: [], // Сегодня
      tomorrow: [], // Завтра
      future: [], // Задачи без даты
    };

    tasks.forEach((task) => {
      if (!task.date_finish) {
        result.noDate.push(task);
        return;
      }

      const taskDate = new Date(task.date_finish);

      if (taskDate < now) {
        result.overdue.push(task);
      } else if (taskDate >= todayStart && taskDate < todayEnd) {
        result.today.push(task);
      } else if (taskDate >= todayEnd && taskDate < tomorrowEnd) {
        result.tomorrow.push(task);
      } else {
        result.future.push(task);
      }
    });

    return result;
  }

  const distributedTasks = distributeTasks(pageStore.tasks);

  return (
    <VStack width={"100%"} align={"flex-start"}>
      {pageStore.search_elements?.length > 0 ? (
        <VStack width={"100%"} align={"flex-start"} justify={"flex-start"}>
          <Text fontWeight={"600"} color={"black"}>
            Найденные результаты
          </Text>
          <HStack
            width={"100%"}
            overflow={"scroll"}
            // overflowY={"hidden"}
            paddingBottom={"8px"}
            paddingLeft={"2px"}
            gap={"20px"}
          >
            {pageStore.search_elements?.map((item, index) => (
              <TaskCard key={index} obj={item} />
            ))}
          </HStack>
        </VStack>
      ) : pageStore.search_elements?.length == 0 &&
        pageStore.searchValue != "" ? (
        <Text fontWeight={"600"} color={"black"}>
          По вашему запросу ничего не найдено
        </Text>
      ) : null}
      <Text fontWeight={"600"} color={"black"}>
        Все задачи
      </Text>
      <HStack
        width={"100%"}
        justify={"flex-start"}
        align={"flex-start"}
        overflow={"hidden"}
        overflowX={"scroll"}
        gap={"2px"}
      >
        <VStack width={"300px"} padding={"10px"} gap={"20px"}>
          <Text
            width={"max-content"}
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            Просроченные
          </Text>
          {distributedTasks?.overdue.length > 0 &&
            distributedTasks?.overdue
              .filter((item) => !item?.is_completed)
              ?.map((item, index) => <TaskCard key={index} obj={item} />)}
        </VStack>
        <VStack width={"300px"} padding={"10px"} gap={"20px"}>
          <Text
            width={"max-content"}
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            На сегодня
          </Text>
          {distributedTasks?.today.length > 0 &&
            distributedTasks?.today
              .filter((item) => !item?.is_completed)
              ?.map((item, index) => <TaskCard key={index} obj={item} />)}
        </VStack>
        <VStack width={"300px"} padding={"10px"} gap={"20px"}>
          <Text
            width={"max-content"}
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            На завтра
          </Text>
          {distributedTasks?.tomorrow.length > 0 &&
            distributedTasks?.tomorrow
              .filter((item) => !item?.is_completed)
              ?.map((item, index) => <TaskCard key={index} obj={item} />)}
        </VStack>
        <VStack width={"300px"} padding={"10px"} gap={"20px"}>
          <Text
            width={"max-content"}
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            На будущее
          </Text>
          {distributedTasks?.future.length > 0 &&
            distributedTasks?.future
              .filter((item) => !item?.is_completed)
              ?.map((item, index) => <TaskCard key={index} obj={item} />)}
        </VStack>

        <VStack width={"300px"} padding={"10px"} gap={"20px"}>
          <Text
            border={"2px solid #4682B4"}
            padding={"4px 10px"}
            boxShadow={"-2px 2px 0 0 #4682B4"}
          >
            Завершенные
          </Text>
          {pageStore.tasks.length > 0 &&
            pageStore.tasks
              .filter((item) => item?.is_completed)
              ?.map((item, index) => <TaskCard key={index} obj={item} />)}
        </VStack>
      </HStack>
    </VStack>
  );
});

export default TableTasks;
