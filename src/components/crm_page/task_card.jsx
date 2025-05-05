import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
  Select,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import * as Yup from "yup";
import { Form, Formik } from "formik";

const TaskCard = observer(({ obj = {}, color = "", bg_color = "green" }) => {
  const { pageStore } = useStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  console.log("obj", obj);

  const initialValues = {
    date_finish: obj?.date_finish,
    description: obj?.description,
    name: obj?.name,
    priority: obj?.priority,
  };
  const validationSchema = Yup.object({
    date_finish: Yup.string().required("Обязательное поле"),
    description: Yup.string().required("Обязательное поле"),
    name: Yup.string().required("Обязательное поле"),
    priority: Yup.string().required("Выберите приоритет задачи"),
  });

  const updateTask = async (id, values) => {
    return await pageStore.updateTask(id, values);
  };

  const completeTask = async (id) => {
    return await pageStore.completeTask(id);
  };

  const deleteTask = async () => {
    const response = await fetch(
      `http://158.255.7.7:8081/api/tasks/${obj?.ID}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${pageStore.token}`,
        },
      }
    );
    return response.ok;
  };

  const handleDeleteTask = async () => {
    const ok = await deleteTask();
    if (ok) {
      pageStore.getAllTasks();
      toast({
        title: "Успех",
        description: "Задача удалена",
        status: "success",
        duration: "3000",
      });
      onClose();
    }
  };

  const handleCompleteTask = async () => {
    const ok = await completeTask(obj?.ID);
    if (ok) {
      pageStore.getAllTasks();
      toast({
        title: "Успех",
        description: "Задача завершена",
        status: "success",
        duration: "3000",
      });
      onClose();
    }
  };

  const onSubmit = async (values) => {
    const ok = await updateTask(obj?.ID, {
      ...values,
      priority: Number(values.priority),
    });
    if (ok) {
      await pageStore.getAllTasks();
      toast({
        title: "Успех",
        description: "Задача обновлена успешно",
        status: "success",
        duration: "3000",
      });
      onClose();
    }
  };

  function formatDateForInput(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Проверка на валидность даты
    if (isNaN(date.getTime())) return "";

    // Преобразуем дату в формат, понятный datetime-local
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  return (
    <>
      <VStack
        width={"100%"}
        minW={"300px"}
        height={"auto"}
        padding={"10px"}
        cursor={"pointer"}
        gap={0}
        borderRadius={"8px"}
        border={`2px solid ${color}`}
        onClick={onOpen}
        position={"relative"}
      >
        <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
          {obj?.name}
        </Text>
        <Text width={"100%"} marginTop={"10px"}>
          {obj?.description}
        </Text>
        <Text marginTop={"20px"} width={"100%"}>
          Срок до {new Date(obj?.date_finish).toLocaleString("ru-RU")}
        </Text>
        <Text marginTop={"10px"} width={"100%"}>
          {obj?.creator?.username || "-"}
        </Text>

        <VStack
          width={5}
          height={5}
          borderRadius={"50%"}
          position={"absolute"}
          bottom={5}
          right={5}
          backgroundColor={
            obj.priority == 0 ? "green" : obj.priority == 1 ? "yellow" : "red"
          }
        />
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />

          <Text
            fontWeight={"600"}
            color={"black"}
            width={"100%"}
            textAlign={"center"}
          >
            Информация о задаче
          </Text>
          {obj?.creator_id == pageStore.user_info?.ID && !obj?.is_completed ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form>
                  {console.log("val", values)}
                  <VStack
                    width={"100%"}
                    justify={"flex-start"}
                    align={"flex-start"}
                    marginTop={"20px"}
                    gap={"10px"}
                  >
                    <FormControl isInvalid={errors.name && touched.name}>
                      <Text fontWeight={"500"}>Название</Text>
                      <Input
                        value={values?.name}
                        placeholder="Название"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.name}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.description && touched.description}
                    >
                      <Text fontWeight={"500"}>Описание</Text>
                      <Textarea
                        value={values?.description}
                        placeholder="Описание"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.description}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.date_finish && touched?.date_finish}
                    >
                      <Text fontWeight={"500"}>Дедлайн</Text>
                      <Input
                        value={formatDateForInput(values?.date_finish)}
                        placeholder=""
                        type="datetime-local"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="date_finish"
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const currentDate = new Date();

                          console.log("Выбранная дата:", e.target.value);
                          console.log("Дата в формате Date:", selectedDate);
                          console.log("Текущая дата:", currentDate);

                          if (currentDate > selectedDate) {
                            toast({
                              title: "Ошибка",
                              description: "Задачу нельзя создать в прошлое",
                              status: "warning",
                              duration: "3000",
                            });
                          } else {
                            setFieldValue(
                              "date_finish",
                              selectedDate.toISOString()
                            );
                          }
                        }}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.date_finish}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors.priority && touched.priority}
                    >
                      <Text fontWeight={"500"}>Приоритет</Text>
                      <Select
                        value={values.priority}
                        placeholder="Выберите приоритет"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="priority"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value={0}>Низкий</option>
                        <option value={1}>Средний</option>
                        <option value={2}>Высокий</option>
                      </Select>
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.priority}
                      </FormErrorMessage>
                    </FormControl>
                    <HStack
                      marginTop={"20px"}
                      justify={"flex-end"}
                      width={"100%"}
                    >
                      <Button
                        onClick={async () => await handleDeleteTask()}
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Удалить</Text>
                      </Button>
                      <Button
                        onClick={async () => await handleCompleteTask()}
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Завершить</Text>
                      </Button>
                    </HStack>
                    <HStack justify={"flex-end"} width={"100%"}>
                      <Button
                        onClick={onClose}
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Отменить</Text>
                      </Button>

                      <Button
                        type="submit"
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Обновить</Text>
                      </Button>
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          ) : (
            <VStack
              width={"100%"}
              justify={"flex-start"}
              align={"flex-start"}
              marginTop={"20px"}
              gap={"10px"}
            >
              <VStack
                width={"100%"}
                align={"flex-start"}
                justify={"flex-start"}
              >
                <Text fontWeight={"500"}>Название</Text>
                <Text color={"black"}>{obj?.name}</Text>
              </VStack>

              <VStack
                width={"100%"}
                align={"flex-start"}
                justify={"flex-start"}
              >
                <Text fontWeight={"500"}>Описание</Text>
                <Textarea
                  value={obj?.description}
                  disabled
                  placeholder="Описание"
                  marginTop={"4px"}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  borderRadius={"8px"}
                  _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                />
              </VStack>
              <VStack
                width={"100%"}
                align={"flex-start"}
                justify={"flex-start"}
              >
                <Text fontWeight={"500"}>Дедлайн</Text>
                <Text>
                  {new Date(obj?.date_finish).toLocaleString("ru-RU")}
                </Text>
              </VStack>
              <HStack width={"100%"} justify={"flex-end"}>
                <Button
                  onClick={async () => await handleDeleteTask()}
                  borderRadius={"8px"}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  bg={"white"}
                  color={"black"}
                  _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                  flexShrink={0}
                >
                  <Text>Удалить</Text>
                </Button>
                <Button
                  onClick={onClose}
                  borderRadius={"8px"}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  bg={"white"}
                  color={"black"}
                  _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                  flexShrink={0}
                >
                  <Text>Закрыть</Text>
                </Button>
              </HStack>
            </VStack>
          )}
        </ModalContent>
      </Modal>
    </>
  );
});

export default TaskCard;
