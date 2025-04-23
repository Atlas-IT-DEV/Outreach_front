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
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "../../store/store_context";

const ModalEditLead = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const [editCompanies, setEditCompanies] = useState(false);
  const [editUsers, setEditUsers] = useState(false);

  const editClient = async (id, values) => {
    return await pageStore.editClient(id, values);
  };

  const clientValues = {
    additions: obj?.additions,
    email: obj?.email,
    first_name: obj?.first_name,
    last_name: obj?.last_name,
    phone: obj?.phone,
  };

  const clientValidationSchema = Yup.object({
    additions: Yup.string().required("Обязательное поле"),
    email: Yup.string().required("Обязательное поле"),
    first_name: Yup.string().required("Обязательное поле"),
    last_name: Yup.string().required("Обязательное поле"),
    phone: Yup.string().required("Обязательное поле"),
  });

  const onUserSumbit = async (values) => {
    const ok = await editClient(obj?.ID, values);
    if (ok) {
      setEditUsers(false);
      await pageStore.getAllClients();
      toast({
        title: "Успех",
        description: "Данные об админе обновлены",
        status: "success",
        duration: 3000,
      });
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
        <Text>Подробнее</Text>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setEditCompanies(false);
          setEditUsers(false);
        }}
        onEsc={() => {
          onClose();
          setEditCompanies(false);
          setEditUsers(false);
        }}
      >
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <VStack bg={"white"} width={"100%"} align={"flex-start"}>
            {editUsers ? (
              <Formik
                initialValues={clientValues}
                validationSchema={clientValidationSchema}
                onSubmit={onUserSumbit}
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
                      align={"flex-start"}
                      justify={"flex-start"}
                    >
                      <Text
                        fontWeight={"600"}
                        width={"100%"}
                        textAlign={"center"}
                      >
                        Редактирование клиента
                      </Text>
                      <FormControl
                        isInvalid={errors?.last_name && touched?.last_name}
                      >
                        <Text fontWeight={"500"}>Фамилия</Text>
                        <Input
                          value={values?.last_name}
                          placeholder="Фамилия"
                          width={"100%"}
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
                          value={values?.first_name}
                          placeholder="Имя"
                          width={"100%"}
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
                      <FormControl isInvalid={errors?.email && touched?.email}>
                        <Text fontWeight={"500"}>Email</Text>
                        <Input
                          value={values?.email}
                          placeholder="Email"
                          width={"100%"}
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
                      <FormControl isInvalid={errors?.phone && touched?.phone}>
                        <Text fontWeight={"500"}>Номер телефона</Text>
                        <Input
                          value={values?.phone}
                          placeholder="Номер телефона"
                          width={"100%"}
                          marginTop={"4px"}
                          border={"2px solid #4682B4"}
                          borderRadius={"0"}
                          _hover={{ border: "2px solid #4682B4" }}
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage marginTop={"2px"}>
                          {errors?.phone}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors?.additions && touched?.additions}
                      >
                        <Text fontWeight={"500"}>Доп. информация</Text>
                        <Input
                          value={values?.additions}
                          placeholder="Доп. информация"
                          width={"100%"}
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
                      <HStack width={"100%"} justify={"center"}>
                        <Button
                          onClick={() => setEditUsers(false)}
                          boxShadow={"-2px 2px 0 0 #4682B4"}
                          borderRadius={"0px"}
                          border={"2px solid #4682B4"}
                          bg={"white"}
                          color={"black"}
                          _hover={{ bg: "#4682B4", color: "white" }}
                          flexShrink={0}
                          marginTop={"20px"}
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
                          marginTop={"20px"}
                        >
                          <Text>Сохранить</Text>
                        </Button>
                      </HStack>
                    </VStack>
                  </Form>
                )}
              </Formik>
            ) : (
              <VStack width={"100%"} gap={"5px"}>
                <Text fontWeight={"600"}>Информация о клиенте</Text>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Фамилия</Text>
                  <Text fontSize={"14px"}>{obj?.last_name || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Имя</Text>
                  <Text fontSize={"14px"}>{obj?.first_name || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Email</Text>
                  <Text fontSize={"14px"}>{obj?.email || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Номер телефона</Text>
                  <Text fontSize={"14px"}>{obj?.phone || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Доп. информация</Text>
                  <Text fontSize={"14px"}>{obj?.additions || "-"}</Text>
                </VStack>
                <Button
                  onClick={() => setEditUsers(true)}
                  boxShadow={"-2px 2px 0 0 #4682B4"}
                  borderRadius={"0px"}
                  border={"2px solid #4682B4"}
                  bg={"white"}
                  color={"black"}
                  _hover={{ bg: "#4682B4", color: "white" }}
                  flexShrink={0}
                  marginTop={"20px"}
                >
                  <Text>Редактировать клиента</Text>
                </Button>
              </VStack>
            )}

            <VStack width={"100%"} gap={"10px"} marginTop={"10px"}></VStack>
          </VStack>
          <HStack width={"100%"} justifyContent={"flex-end"}>
            <Button
              onClick={() => {
                onClose();
                setEditCompanies(false);
                setEditUsers(false);
              }}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"2px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
              flexShrink={0}
              marginTop={"20px"}
            >
              <Text>Закрыть</Text>
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalEditLead;
