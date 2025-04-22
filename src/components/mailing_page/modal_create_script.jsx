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
import useWindowDimensions from "../../windowDimensions";
import { useStores } from "../../store/store_context";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";

const ModalCreateScript = observer(() => {
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const toast = useToast();

  const initialValues = {
    department_id: pageStore.selected_department,
    is_email: true,
    is_hiden: false,
    name: "",
    text: "",
  };

  const validationSchema = Yup.object({
    department_id: Yup.number().required("Обязательное поле"),
    name: Yup.string().required("Обязательное поле"),
    text: Yup.string().required("Обязательное поле"),
  });

  const createScript = async (values) => {
    return await pageStore.createScript(values);
  };

  const onSubmit = async (values) => {
    const ok = await createScript(values);
    if (ok) {
      await pageStore.getAllScripts();
      toast({
        title: "Успех",
        description: "Скрипт создан успешно",
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
        <Text fontSize={width >= 1000 ? "16px" : "14px"}>Новый скрипт</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
            Создание скрипта
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
                  <FormControl isInvalid={errors?.text && touched?.text}>
                    <Text fontWeight={"500"}>Текст</Text>
                    <Input
                      placeholder="Текст"
                      marginTop={"4px"}
                      border={"2px solid #4682B4"}
                      borderRadius={"0"}
                      _hover={{ border: "2px solid #4682B4" }}
                      name="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage marginTop={"2px"}>
                      {errors?.text}
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

export default ModalCreateScript;
