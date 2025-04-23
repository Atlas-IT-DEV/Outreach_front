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
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useWindowDimensions from "../../windowDimensions";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";

const ModalCreateClient = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const leadValues = {
    name: "",
    description: "",
    director: {
      first_name: "",
      last_name: "",
      password: "",
      phone: "",
      username: "",
    },
  };

  const validationSchema = Yup.object({
    director: Yup.object().shape({
      first_name: Yup.string().required("Обязательное поле"),
      last_name: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
      phone: Yup.string()
        .required("Обязательное поле")
        .min(11, "Номер слишком короткий")
        .max(15, "Номер слишком длинный"),
      username: Yup.string().required("Обязательное поле"),
    }),
    name: Yup.string().required("Обязательное поле"),
    description: Yup.string().required("Обязательное поле"),
  });

  const createCompamy = async (values) => {
    return await pageStore.createCompamy(values);
  };
  const onSubmit = async (values) => {
    const ok = await createCompamy(values);
    if (ok) {
      await pageStore.getAllCompanies();
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
        border={"2px solid #4682B4"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
        flexShrink={0}
      >
        <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
          Создать нового клиента
        </Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Formik
            initialValues={leadValues}
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
                    Создание клиента
                  </Text>
                  <VStack width={"100%"} gap={"10px"} marginTop={"10px"}>
                    <FormControl
                      isInvalid={
                        errors?.director?.username &&
                        touched?.director?.username
                      }
                    >
                      <Text fontWeight={"500"}>Никнейм</Text>
                      <Input
                        placeholder="Никнейм"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="director.username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.username}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        errors?.director?.password &&
                        touched?.director?.password
                      }
                    >
                      <Text fontWeight={"500"}>Пароль</Text>
                      <Input
                        placeholder="Пароль"
                        type="password"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="director.password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.password}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        errors?.director?.last_name &&
                        touched?.director?.last_name
                      }
                    >
                      <Text fontWeight={"500"}>Фамилия</Text>
                      <Input
                        placeholder="Фамилия"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="director.last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.last_name}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        errors?.director?.first_name &&
                        touched?.director?.first_name
                      }
                    >
                      <Text fontWeight={"500"}>Имя</Text>
                      <Input
                        placeholder="Имя"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="director.first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.first_name}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={
                        errors?.director?.phone && touched?.director?.phone
                      }
                    >
                      <Text fontWeight={"500"}>Номер телефона</Text>
                      <Input
                        placeholder="Номер телефона"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="director.phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.phone}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.name && touched?.name}>
                      <Text fontWeight={"500"}>Название компаниии</Text>
                      <Input
                        placeholder="Название компании"
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
                      <Text fontWeight={"500"}>Описание компании</Text>
                      <Input
                        placeholder="Описание компании"
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

export default ModalCreateClient;
