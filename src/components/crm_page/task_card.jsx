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
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import * as Yup from "yup";
import { Form, Formik } from "formik";

const TaskCard = observer(({ obj = {} }) => {
  const { pageStore } = useStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const initialValues = {
    date_finish: new Date(obj?.date_finish).toISOString(),
    description: obj?.description,
    name: obj?.name,
  };
  const validationSchema = Yup.object({
    date_finish: Yup.string().required("Обязательное поле"),
    description: Yup.string().required("Обязательное поле"),
    name: Yup.string().required("Обязательное поле"),
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
      await pageStore.getAllTasks();
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
      await pageStore.getAllTasks();
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
    const ok = await updateTask(obj?.ID, values);
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
  return (
    <>
      <VStack
        width={"180px"}
        height={"auto"}
        padding={"10px"}
        cursor={"pointer"}
        gap={0}
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        border={"2px solid #4682B4"}
        onClick={onOpen}
      >
        <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
          {obj?.name}
        </Text>
        <Text width={"100%"} marginTop={"10px"}>
          {obj?.description}
        </Text>
        <Text marginTop={"20px"} width={"100%"}>
          До {new Date(obj?.date_finish).toLocaleDateString()}
        </Text>
        <Text marginTop={"10px"} width={"100%"}>
          {obj?.creator?.username || "-"}
        </Text>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
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
          {obj?.creator_id == pageStore.user_info?.ID ? (
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
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
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
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
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
                        value={new Date(values?.date_finish).toLocaleDateString(
                          "en-CA"
                        )}
                        placeholder=""
                        type="date"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="date_finish"
                        onChange={(e) =>
                          setFieldValue(
                            "date_finish",
                            new Date(e.target.value).toISOString()
                          )
                        }
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.date_finish}
                      </FormErrorMessage>
                    </FormControl>
                    <HStack
                      marginTop={"20px"}
                      justify={"flex-end"}
                      width={"100%"}
                    >
                      <Button
                        onClick={async () => await handleDeleteTask()}
                        boxShadow={"-2px 2px 0 0 #4682B4"}
                        borderRadius={"0px"}
                        border={"2px solid #4682B4"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "#4682B4", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Удалить</Text>
                      </Button>
                      <Button
                        onClick={async () => await handleCompleteTask()}
                        boxShadow={"-2px 2px 0 0 #4682B4"}
                        borderRadius={"0px"}
                        border={"2px solid #4682B4"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "#4682B4", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Завершить</Text>
                      </Button>
                    </HStack>
                    <HStack justify={"flex-end"} width={"100%"}>
                      <Button
                        onClick={onClose}
                        boxShadow={"-2px 2px 0 0 #4682B4"}
                        borderRadius={"0px"}
                        border={"2px solid #4682B4"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "#4682B4", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>Отменить</Text>
                      </Button>
                      <Button
                        type="submit"
                        boxShadow={"-2px 2px 0 0 #4682B4"}
                        borderRadius={"0px"}
                        border={"2px solid #4682B4"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "#4682B4", color: "white" }}
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
                  border={"2px solid #4682B4"}
                  borderRadius={"0"}
                  _hover={{ border: "2px solid #4682B4" }}
                />
              </VStack>
              <VStack
                width={"100%"}
                align={"flex-start"}
                justify={"flex-start"}
              >
                <Text fontWeight={"500"}>Дедлайн</Text>
                <Text>{obj?.date_finish}</Text>
              </VStack>
              <HStack width={"100%"} justify={"flex-end"}>
                <Button
                  onClick={onClose}
                  boxShadow={"-2px 2px 0 0 #4682B4"}
                  borderRadius={"0px"}
                  border={"2px solid #4682B4"}
                  bg={"white"}
                  color={"black"}
                  _hover={{ bg: "#4682B4", color: "white" }}
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
