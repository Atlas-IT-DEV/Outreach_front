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
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStores } from "../../store/store_context";

const ModalEditClient = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const [editCompanies, setEditCompanies] = useState(false);
  const [editUsers, setEditUsers] = useState(false);

  const editUser = async (id, values) => {
    return await pageStore.editUser(id, values);
  };

  const editCompany = async (id, values) => {
    return await pageStore.editCompany(id, values);
  };

  const userValues = {
    first_name: obj?.director?.first_name,
    last_name: obj?.director?.last_name,
    phone: obj?.director?.phone,
    // убрать
    role: 1,
    username: obj?.director?.username,
  };

  const companyValues = {
    name: obj?.name,
    description: obj?.description,
  };

  const userValidationSchema = Yup.object({
    first_name: Yup.string().required("Обязательное поле"),
    last_name: Yup.string().required("Обязательное поле"),
    phone: Yup.string().required("Обязательное поле"),
    // убрать
    username: Yup.string().required("Обязательное поле"),
  });

  const companyValidationSchema = Yup.object({
    name: Yup.string().required("Обязательное поле"),
    description: Yup.string().required("Обязательное поле"),
  });

  const onUserSumbit = async (values) => {
    const ok = await editUser(obj?.director?.ID, values);
    if (ok) {
      setEditUsers(false);
      await pageStore.getAllCompanies();
      toast({
        title: "Успех",
        description: "Данные об админе обновлены",
        status: "success",
        duration: 3000,
      });
    }
  };

  const onCompanySubmit = async (values) => {
    const ok = await editCompany(obj?.ID, values);
    if (ok) {
      setEditCompanies(false);
      await pageStore.getAllCompanies();
      toast({
        title: "Успех",
        description: "Данные о компании обновлены",
        status: "success",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => onOpen()}
        
        borderRadius={"8px"}
        border={"2px solid rgba(48, 141, 218, 1)"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
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
        <ModalContent
          height={"auto"}
          overflow={"hidden"}
          overflowY={"scroll"}
          padding={"20px"}
        >
          <ModalCloseButton />
          <VStack bg={"white"} width={"100%"} align={"flex-start"}>
            {editUsers ? (
              <Formik
                initialValues={userValues}
                validationSchema={userValidationSchema}
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
                      marginTop={"20px"}
                    >
                      <Text
                        fontWeight={"600"}
                        width={"100%"}
                        textAlign={"center"}
                      >
                        Редактирование админа
                      </Text>
                      <FormControl
                        isInvalid={errors?.username && touched?.username}
                      >
                        <Text fontWeight={"500"}>Никнейм</Text>
                        <Input
                          value={values?.username}
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
                        isInvalid={errors?.last_name && touched?.last_name}
                      >
                        <Text fontWeight={"500"}>Фамилия</Text>
                        <Input
                          value={values?.last_name}
                          placeholder="Фамилия"
                          width={"100%"}
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
                          value={values?.first_name}
                          placeholder="Имя"
                          width={"100%"}
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
                      <FormControl isInvalid={errors?.phone && touched?.phone}>
                        <Text fontWeight={"500"}>Номер телефона</Text>
                        <Input
                          value={values?.phone}
                          placeholder="Номер телефона"
                          width={"100%"}
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
                      <HStack width={"100%"} justify={"center"}>
                        <Button
                          onClick={() => setEditUsers(false)}
                          
                          borderRadius={"8px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          bg={"white"}
                          color={"black"}
                          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                          flexShrink={0}
                          marginTop={"20px"}
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
                <Text fontWeight={"600"}>Информация об админе</Text>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Никнейм</Text>
                  <Text fontSize={"14px"}>{obj?.director?.username}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Фамилия</Text>
                  <Text fontSize={"14px"}>{obj?.director?.last_name}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Имя</Text>
                  <Text fontSize={"14px"}>{obj?.director?.first_name}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Номер телефона</Text>
                  <Text fontSize={"14px"}>{obj?.director?.phone}</Text>
                </VStack>
                <Button
                  onClick={() => setEditUsers(true)}
                  
                  borderRadius={"8px"}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  bg={"white"}
                  color={"black"}
                  _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                  flexShrink={0}
                  marginTop={"20px"}
                >
                  <Text>Редактировать админа</Text>
                </Button>
              </VStack>
            )}

            {editCompanies ? (
              <Formik
                initialValues={companyValues}
                validationSchema={companyValidationSchema}
                onSubmit={onCompanySubmit}
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
                      marginTop={"20px"}
                    >
                      <Text
                        fontWeight={"600"}
                        width={"100%"}
                        textAlign={"center"}
                      >
                        Редактирование компании
                      </Text>
                      <FormControl isInvalid={errors?.name && touched?.name}>
                        <Text fontWeight={"500"}>Название компаниии</Text>
                        <Input
                          value={values?.name}
                          placeholder="Название компании"
                          marginTop={"4px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          borderRadius={"8px"}
                          _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
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
                        <Textarea
                          value={values?.description}
                          placeholder="Описание компании"
                          width={"100%"}
                          marginTop={"4px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          borderRadius={"8px"}
                          _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage marginTop={"2px"}>
                          {errors?.description}
                        </FormErrorMessage>
                      </FormControl>
                      <HStack width={"100%"} justify={"center"}>
                        <Button
                          onClick={() => setEditCompanies(false)}
                          
                          borderRadius={"8px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          bg={"white"}
                          color={"black"}
                          _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                          flexShrink={0}
                          marginTop={"20px"}
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
              <VStack width={"100%"} gap={"5px"} marginTop={"20px"}>
                <Text fontWeight={"600"}>Информация о компании</Text>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Название</Text>
                  <Text fontSize={"14px"}>{obj?.name}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Описание</Text>
                  <Textarea fontSize={"14px"} disabled>
                    {obj?.description}
                  </Textarea>
                </VStack>
                <Button
                  onClick={() => setEditCompanies(true)}
                  
                  borderRadius={"8px"}
                  border={"2px solid rgba(48, 141, 218, 1)"}
                  bg={"white"}
                  color={"black"}
                  _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                  flexShrink={0}
                  marginTop={"20px"}
                >
                  <Text>Редактировать компанию</Text>
                </Button>
              </VStack>
            )}

            <VStack width={"100%"} gap={"10px"} marginTop={"10px"}></VStack>
          </VStack>
          {/* </Form>
              )}
            </Formik> */}
          <HStack width={"100%"} justifyContent={"flex-end"}>
            <Button
              onClick={() => {
                onClose();
                setEditCompanies(false);
                setEditUsers(false);
              }}
              
              borderRadius={"8px"}
              border={"2px solid rgba(48, 141, 218, 1)"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
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

export default ModalEditClient;
