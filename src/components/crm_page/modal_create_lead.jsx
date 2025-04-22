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
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useWindowDimensions from "../../windowDimensions";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const ModalCreateLead = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const clientValues = {
    additions: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Обязательное поле"),
    last_name: Yup.string().required("Обязательное поле"),
    phone: Yup.string()
      .required("Обязательное поле")
      .min(11, "Номер слишком короткий")
      .max(15, "Номер слишком длинный"),
    email: Yup.string().required("Обязательное поле"),
    additions: Yup.string().required("Обязательное поле"),
  });

  const createClient = async (values) => {
    return await pageStore.createClient(values);
  };
  const onSubmit = async (values) => {
    const ok = await createClient(values);
    if (ok) {
      await pageStore.getAllClients();
      toast({
        title: "Успех",
        description: "Новый лид успешно создан",
        duration: 3000,
        status: "success",
      });
      onClose();
    }
  };

  return (
    <>
      <Button
        onClick={() => onOpen()}
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        border={"1px solid #4682B4"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
        flexShrink={0}
      >
        <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
          Создать нового лида
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent
          margin={"auto"}
          borderRadius={"0px"}
          border={"2px solid #4682B4"}
          height={"auto"}
          minH={width >= 1400 ? "auto" : height}
        >
          <ModalCloseButton />
          <Formik
            initialValues={clientValues}
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
                  bg={"white"}
                  padding={"20px"}
                  width={"100%"}
                  align={"flex-start"}
                  marginTop={"20px"}
                >
                  <Text color={"black"} fontWeight={"600"}>
                    Создание лида
                  </Text>
                  <VStack width={"100%"} gap={"10px"} marginTop={"10px"}>
                    <FormControl
                      isInvalid={errors?.last_name && touched?.last_name}
                    >
                      <Text fontWeight={"500"}>Фамилия</Text>
                      <Input
                        placeholder="Фамилия"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.last_name}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={errors?.first_name && touched?.first_name}
                    >
                      <Text fontWeight={"500"}>Имя</Text>
                      <Input
                        placeholder="Имя"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.first_name}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.phone && touched?.phone}>
                      <Text fontWeight={"500"}>Номер телефона</Text>
                      <Input
                        placeholder="Номер телефона"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.phone}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.email && touched?.email}>
                      <Text fontWeight={"500"}>email</Text>
                      <Input
                        placeholder="Email"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.email}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.additions && touched?.additions}
                    >
                      <Text fontWeight={"500"}>Доп. информация</Text>
                      <Input
                        placeholder="Доп. информация"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="additions"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.additions}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>
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

export default ModalCreateLead;
