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
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import useWindowDimensions from "../../windowDimensions";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useStores } from "../../store/store_context";

const ModalCreateWork = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const initialValues = {
    automated: true,
    date_start: "",
    department_id: pageStore.selected_department,
    description: "",
    name: "",
    obzvon: "1",
    time_finish: null,
    time_start: null,
    type_work: 0,
  };

  const validationSchema = Yup.object({
    date_start: Yup.string().required("Обязательное поле"),
    description: Yup.string().required("Обязательное поле"),
    name: Yup.string().required("Обязательное поле"),
    time_finish: Yup.number().required("Обязательное поле"),
    time_start: Yup.number().required("Обязательное поле"),
  });

  const createWork = async (values) => {
    return await pageStore.createWork(values);
  };

  const onSubmit = async (values) => {
    const ok = await createWork(values);
    if (ok) {
      await pageStore.getAllWorks();
      toast({
        title: "Успех",
        description: "Ворк успешно создан",
        duration: "3000",
        status: "success",
      });
      onClose();
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        border={"1px solid #4682B4"}
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
      >
        <Text fontSize={width >= 1000 ? "16px" : "14px"}>Новый ворк</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
            Создание ворка
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
              <Form style={{ width: "100%" }}>
                <VStack
                  width={"100%"}
                  marginTop={"10px"}
                  align={"flex-start"}
                  justify={"flex-start"}
                  gap={"10px"}
                >
                  <FormControl isInvalid={errors?.name && touched?.name}>
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
                      {errors?.name}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={errors?.description && touched?.description}
                  >
                    <Text fontWeight={"500"}>Описание</Text>
                    <Input
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
                      {errors?.description}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={errors?.date_start && touched?.date_start}
                  >
                    <Text fontWeight={"500"}>Дата начала</Text>
                    <Input
                      placeholder="Название"
                      type="date"
                      marginTop={"4px"}
                      border={"2px solid #4682B4"}
                      borderRadius={"0"}
                      _hover={{ border: "2px solid #4682B4" }}
                      name="date_start"
                      onChange={(e) =>
                        setFieldValue(
                          "date_start",
                          new Date(e.target.value).toISOString()
                        )
                      }
                    />
                    <FormErrorMessage marginTop={"2px"}>
                      {errors?.date_start}
                    </FormErrorMessage>
                  </FormControl>
                  <Text fontWeight={"500"}>Время работы</Text>
                  <HStack width={"100%"} justify={"space-between"}>
                    <FormControl
                      isInvalid={errors?.time_start && touched?.time_start}
                    >
                      <Text fontWeight={"500"}>С</Text>
                      <Input
                        placeholder="C"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="time_start"
                        value={values?.time_start}
                        onChange={(e) =>
                          setFieldValue("time_start", Number(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.time_start}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.time_finish && touched?.time_finish}
                    >
                      <Text fontWeight={"500"}>До</Text>
                      <Input
                        placeholder="До"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="time_finish"
                        value={values?.time_finish}
                        onChange={(e) =>
                          setFieldValue("time_finish", Number(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.time_finish}
                      </FormErrorMessage>
                    </FormControl>
                  </HStack>
                  <HStack
                    marginTop={"20px"}
                    justify={"flex-end"}
                    width={"100%"}
                  >
                    <Button
                      onClick={onClose}
                      boxShadow={"-2px 2px 0 0 #4682B4"}
                      borderRadius={"0px"}
                      border={"1px solid #4682B4"}
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
                      border={"1px solid #4682B4"}
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

export default ModalCreateWork;
