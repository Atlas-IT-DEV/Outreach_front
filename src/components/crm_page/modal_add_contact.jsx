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
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useWindowDimensions from "../../windowDimensions";
import { observer } from "mobx-react-lite";

const ModalAddContact = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();

  const leadValues = {
    fullName: "",
    phoneNumber: "",
    company: "",
    email: "",
    inn: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Обязательное поле"),
    phoneNumber: Yup.string().required("Обязательное поле"),
    company: Yup.string().required("Обязательное поле"),
    email: Yup.string().required("Обязательное поле"),

    inn: Yup.string().required("Обязательное поле"),
  });

  const onSubmit = async (values) => {};
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
          Добавить контакт
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent
          margin={"auto"}
          borderRadius={"8px"}
          border={"2px solid rgba(48, 141, 218, 1)"}
          height={"auto"}
          //   minH={width >= 1400 ? height - 100 : height}
          overflow={"hidden"}
          overflowY={"scroll"}
        >
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
                <VStack
                  bg={"white"}
                  padding={"20px"}
                  width={"100%"}
                  align={"flex-start"}
                  marginTop={"20px"}
                >
                  <VStack width={"100%"} gap={"10px"} marginTop={"10px"}>
                    <FormControl
                      isInvalid={errors.fullName && touched.fullName}
                    >
                      <Text fontWeight={"500"}>ФИО</Text>
                      <Input
                        placeholder="ФИО"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="fullName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.fullName}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={errors.phoneNumber && touched.phoneNumber}
                    >
                      <Text fontWeight={"500"}>Номер телефона</Text>
                      <Input
                        placeholder="Номер телефона"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.phoneNumber}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.company && touched.company}>
                      <Text fontWeight={"500"}>Компания</Text>
                      <Input
                        placeholder="Компания"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.company}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.email && touched.email}>
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
                        {errors.email}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.inn && touched.inn}>
                      <Text fontWeight={"500"}>ИНН</Text>
                      <Input
                        placeholder="ИНН"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="inn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.inn}
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
                      onClick={onClose}
                      
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

export default ModalAddContact;
