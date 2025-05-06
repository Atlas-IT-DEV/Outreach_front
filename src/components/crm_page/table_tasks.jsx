import { HStack, Stack, Text, Tooltip, VStack } from "@chakra-ui/react";
import TaskCard from "./task_card";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState } from "react";

// Обертка для DnD контекста
const DndTable = observer(() => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TableTasks />
    </DndProvider>
  );
});

// Компонент перетаскиваемой карточки
const DraggableTaskCard = observer(({ task, color, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.ID }, // Используем ID вместо id
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: "100%",
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <TaskCard obj={task} color={color} />
    </div>
  );
});

// Компонент колонки, принимающей перетаскиваемые элементы
const TaskColumn = observer(({ title, color, tasks, onDrop, type }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => {
      onDrop(item.id, type);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <VStack
      ref={drop}
      width={"100%"}
      gap={"10px"}
      bg={isOver ? "rgba(0,0,0,0.05)" : "transparent"}
      borderRadius="md"
      p={2}
      minHeight="200px"
    >
      <Text
        minWidth={"300px"}
        border={`2px solid ${color}`}
        padding={"4px 10px"}
        borderRadius={"8px"}
        textAlign={"center"}
        width={"100%"}
      >
        {title}
      </Text>
      {tasks
        ?.filter((item) => !item?.is_completed || type === "completed")
        .map((item) => (
          <DraggableTaskCard
            key={item.ID} // Используем ID задачи как ключ
            task={item}
            color={color}
            onDrop={onDrop}
          />
        ))}
    </VStack>
  );
});

const TableTasks = observer(() => {
  const { pageStore } = useStores();

  const [overdueFilter, setOverdueFilter] = useState(false);
  const [futureFilter, setFutureFilter] = useState(false);
  const [completedFilter, setCompletedFilter] = useState(false);

  // Оптимизированная функция распределения задач
  const distributeTasks = (tasks) => {
    const now = new Date();
    return tasks.reduce(
      (result, task) => {
        const taskDate = new Date(task.date_finish);
        taskDate < now ? result.overdue.push(task) : result.future.push(task);
        return result;
      },
      { overdue: [], future: [] }
    );
  };

  const handleDrop = async (taskId, targetType) => {
    const task = pageStore.tasks.find((t) => t.ID === taskId);
    if (!task) return;

    const updatedTask = { ...task };

    switch (targetType) {
      case "overdue":
        updatedTask.date_finish = new Date(Date.now() - 86400000).toISOString();
        updatedTask.is_completed = false;
        break;
      case "future":
        updatedTask.date_finish = new Date(Date.now() + 86400000).toISOString();
        updatedTask.is_completed = false;
        break;
      case "completed":
        updatedTask.is_completed = true;
        break;
      default:
        return;
    }

    try {
      await pageStore.updateTask(updatedTask.ID, updatedTask);
      // Локальное обновление без перезагрузки всех задач
      const index = pageStore.tasks.findIndex((t) => t.ID === updatedTask.ID);
      if (index !== -1) {
        pageStore.tasks[index] = updatedTask;
      }
    } catch (error) {
      console.error("Ошибка при обновлении задачи:", error);
    }
  };

  const distributedTasks = distributeTasks(pageStore.tasks);

  return (
    <VStack width={"100%"} align={"flex-start"} spacing={4}>
      {/* Поиск и результаты поиска */}
      {pageStore.search_elements?.length > 0 ? (
        <VStack width={"100%"} align={"flex-start"}>
          <Text fontWeight={"600"} color={"black"}>
            Найденные результаты
          </Text>
          <HStack width={"100%"} overflowX="auto" py={2} px={1} spacing={5}>
            {pageStore.search_elements.map((item) => (
              <TaskCard key={item.ID} obj={item} />
            ))}
          </HStack>
        </VStack>
      ) : pageStore.search_elements?.length === 0 && pageStore.searchValue ? (
        <Text fontWeight={"600"} color={"black"}>
          По вашему запросу ничего не найдено
        </Text>
      ) : null}

      {/* Основные колонки с задачами */}
      <Text fontWeight={"600"} color={"black"}>
        Все задачи
      </Text>
      <HStack
        width={"100%"}
        align={"flex-start"}
        overflowX="auto"
        spacing={4}
        pb={2}
      >
        <VStack width={"100%"} align={"flex-start"}>
          <HStack>
            <Tooltip
              label={"Показать задачи с высоким приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"red"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  overdueFilter === 2 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  overdueFilter === 2
                    ? setOverdueFilter(false)
                    : setOverdueFilter(2)
                }
              />
            </Tooltip>

            <Tooltip
              label={"Показать задачи со средним приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"yellow"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  overdueFilter === 1 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  overdueFilter === 1
                    ? setOverdueFilter(false)
                    : setOverdueFilter(1)
                }
              />
            </Tooltip>
            <Tooltip
              label={"Показать задачи с низким приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"green"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  overdueFilter === 0 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  overdueFilter === 0
                    ? setOverdueFilter(false)
                    : setOverdueFilter(0)
                }
              />
            </Tooltip>
          </HStack>
          <TaskColumn
            title="Просроченные"
            color="rgb(50, 142, 218)"
            tasks={
              overdueFilter === 0
                ? distributedTasks.overdue?.filter(
                    (item) => item?.priority == 0
                  )
                : overdueFilter === 1
                ? distributedTasks.overdue?.filter(
                    (item) => item?.priority == 1
                  )
                : overdueFilter === 2
                ? distributedTasks.overdue?.filter(
                    (item) => item?.priority == 2
                  )
                : distributedTasks.overdue
            }
            onDrop={handleDrop}
            type="overdue"
          />
        </VStack>

        <VStack width={"100%"} align={"flex-start"}>
          <HStack>
            <Tooltip
              label={"Показать задачи с высоким приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"red"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  futureFilter === 2 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  futureFilter === 2
                    ? setFutureFilter(false)
                    : setFutureFilter(2)
                }
              />
            </Tooltip>

            <Tooltip
              label={"Показать задачи со средним приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"yellow"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  futureFilter === 1 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  futureFilter === 1
                    ? setFutureFilter(false)
                    : setFutureFilter(1)
                }
              />
            </Tooltip>
            <Tooltip
              label={"Показать задачи с низким приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"green"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  futureFilter === 0 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  futureFilter === 0
                    ? setFutureFilter(false)
                    : setFutureFilter(0)
                }
              />
            </Tooltip>
          </HStack>
          <TaskColumn
            title="К исполнению"
            color="rgb(50, 142, 218)"
            tasks={
              futureFilter === 0
                ? distributedTasks.future?.filter((item) => item?.priority == 0)
                : futureFilter === 1
                ? distributedTasks.future?.filter((item) => item?.priority == 1)
                : futureFilter === 2
                ? distributedTasks.future?.filter((item) => item?.priority == 2)
                : distributedTasks.future
            }
            onDrop={handleDrop}
            type="future"
          />
        </VStack>

        <VStack width={"100%"} align={"flex-start"}>
          <HStack>
            <Tooltip
              label={"Показать задачи с высоким приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"red"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  completedFilter === 2 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  completedFilter === 2
                    ? setCompletedFilter(false)
                    : setCompletedFilter(2)
                }
              />
            </Tooltip>

            <Tooltip
              label={"Показать задачи со средним приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"yellow"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  completedFilter === 1 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  completedFilter === 1
                    ? setCompletedFilter(false)
                    : setCompletedFilter(1)
                }
              />
            </Tooltip>
            <Tooltip
              label={"Показать задачи с низким приоритетом"}
              bg={"rgba(48, 141, 218, 1)"}
              color={"white"}
              borderRadius={"10px"}
              placement="top-start"
            >
              <Stack
                bg={"green"}
                width={"30px"}
                height={"30px"}
                borderRadius={"100px"}
                cursor={"pointer"}
                border={
                  completedFilter === 0 ? "5px solid rgb(50, 142, 218)" : null
                }
                onClick={() =>
                  completedFilter === 0
                    ? setCompletedFilter(false)
                    : setCompletedFilter(0)
                }
              />
            </Tooltip>
          </HStack>

          <TaskColumn
            title="Завершенные"
            color="rgb(50, 142, 218)"
            tasks={
              completedFilter === 0
                ? pageStore.tasks.filter(
                    (t) => t.is_completed && t.priority == 0
                  )
                : completedFilter === 1
                ? pageStore.tasks.filter(
                    (t) => t.is_completed && t.priority == 1
                  )
                : completedFilter === 2
                ? pageStore.tasks.filter(
                    (t) => t.is_completed && t.priority == 2
                  )
                : pageStore.tasks.filter((t) => t.is_completed)
            }
            onDrop={handleDrop}
            type="completed"
          />
        </VStack>
      </HStack>
    </VStack>
  );
});

export default DndTable;
