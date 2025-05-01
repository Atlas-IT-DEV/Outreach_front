import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Modal,
  ModalBody,
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
import * as Yup from "yup";
import useWindowDimensions from "../../windowDimensions";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const ModalCreateUser = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const userValues = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    phone: "",
    username: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Обязательное поле"),
    first_name: Yup.string().required("Обязательное поле"),
    last_name: Yup.string().required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
    phone: Yup.string().required("Обязательное поле"),
    username: Yup.string().required("Обязательное поле"),
  });

  const createUser = async (values) => {
    return await pageStore.createUser(values);
  };
  const onSubmit = async (values) => {
    const ok = await createUser(values);
    if (ok) {
      await pageStore.getAllUsers();
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
        onClick={onOpen}
        
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
        flexShrink={0}
      >
        <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
          Создать нового сотрудника
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Formik
            initialValues={userValues}
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
                <VStack bg={"white"} width={"100%"} align={"flex-start"}>
                  <Text
                    color={"black"}
                    fontWeight={"600"}
                    width={"100%"}
                    textAlign={"center"}
                  >
                    Создание сотрудника
                  </Text>
                  <VStack width={"100%"} gap={"10px"} marginTop={"10px"}>
                    <FormControl
                      isInvalid={errors?.username && touched?.username}
                    >
                      <Text fontWeight={"500"}>Никнейм</Text>
                      <Input
                        placeholder="Никнейм"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.username}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.password && touched?.password}
                    >
                      <Text fontWeight={"500"}>Пароль</Text>
                      <Input
                        type="password"
                        placeholder="Пароль"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.password}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={errors?.last_name && touched?.last_name}
                      marginTop={"10px"}
                    >
                      <Text fontWeight={"500"}>Фамилия</Text>
                      <Input
                        placeholder="Фамилия"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
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
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.first_name}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.email && touched?.email}>
                      <Text fontWeight={"500"}>Email</Text>
                      <Input
                        placeholder="Email"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.email}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors?.phone && touched?.phone}>
                      <Text fontWeight={"500"}>Номер телефона</Text>
                      <Input
                        placeholder="Номер телефона"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.phone}
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

export default ModalCreateUser;
