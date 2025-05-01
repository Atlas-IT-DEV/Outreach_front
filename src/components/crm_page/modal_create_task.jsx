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
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { useStores } from "../../store/store_context";

const ModalCreateTask = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const toast = useToast();

  const initialValues = {
    date_finish: "",
    description: "",
    name: "",
  };

  const validationSchema = Yup.object({
    date_finish: Yup.string().required("Обязательное поле"),
    description: Yup.string().required("Обязательное поле"),
    name: Yup.string().required("Обязательное поле"),
  });

  const createTask = async (values) => {
    return await pageStore.createTask(values);
  };

  const onSubmit = async (values) => {
    const ok = await createTask(values);
    if (ok) {
      pageStore.getAllTasks();
      toast({
        title: "Успех",
        description: "Задача успешно создана",
        status: "success",
        duration: "3000",
      });
      onClose();
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        flexShrink={0}
      >
        <Text>Создать задачу</Text>
      </Button>
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
            Создание задачи
          </Text>
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
                  {console.log("date", values?.date_finish)}
                  <FormControl isInvalid={errors.name && touched.name}>
                    <Text fontWeight={"500"}>Название</Text>
                    <Input
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
                  <HStack
                    marginTop={"20px"}
                    justify={"flex-end"}
                    width={"100%"}
                  >
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
                      <Text>Создать</Text>
                    </Button>
                  </HStack>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalCreateTask;
