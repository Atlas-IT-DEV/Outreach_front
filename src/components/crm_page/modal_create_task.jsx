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
    console.log(values);
    const ok = await createTask(values);
    if (ok) {
      await pageStore.getAllTasks();
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
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        border={"2px solid #4682B4"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
        flexShrink={0}
      >
        <Text>Создать задачу</Text>
      </Button>
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
                  <FormControl isInvalid={errors.name && touched.name}>
                    <Text fontWeight={"500"}>Название</Text>
                    <Input
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
