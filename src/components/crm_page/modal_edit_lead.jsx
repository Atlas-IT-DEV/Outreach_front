import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
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

const ModalEditLead = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();

  console.log("obj", obj);

  const leadValues = {
    initials: obj?.responsible,
    phoneNumber: obj?.number,
    email: obj?.email,
    company: obj?.company,
    post: obj?.post,
    inn: obj?.inn,
    ogrn: obj?.ogrn,
    activity: obj?.activity,
  };

  const validationSchema = Yup.object({
    initials: Yup.string().required("Обязательное поле"),
    phoneNumber: Yup.string().required("Обязательное поле"),
    email: Yup.string().required("Обязательное поле"),
    company: Yup.string().required("Обязательное поле"),
    post: Yup.string().required("Обязательное поле"),
    inn: Yup.string().required("Обязательное поле"),
    ogrn: Yup.string().required("Обязательное поле"),
    activity: Yup.string().required("Обязательное поле"),
  });

  const onSubmit = async (values) => {};

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
        <Text>Подробнее</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} onEsc={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent
          margin={"auto"}
          borderRadius={"0px"}
          border={"2px solid #4682B4"}
          height={"auto"}
          minH={width >= 1400 ? height - 100 : height}
          overflow={"hidden"}
          overflowY={"scroll"}
        >
          <ModalCloseButton onClick={() => console.log("click")} />
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
                  <Text color={"black"} fontWeight={"600"}>
                    Контакт
                  </Text>
                  <VStack width={"100%"} gap={"10px"} marginTop={"10px"}>
                    <FormControl
                      isInvalid={errors.initials && touched.initials}
                    >
                      <Text fontWeight={"500"}>ФИО</Text>
                      <Input
                        value={values?.initials}
                        placeholder="ФИО"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="initials"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.initials}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={errors.phoneNumber && touched.phoneNumber}
                    >
                      <Text fontWeight={"500"}>Номер телефона</Text>
                      <Input
                        value={values?.phoneNumber}
                        placeholder="Номер телефона"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.phoneNumber}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.email && touched.email}>
                      <Text fontWeight={"500"}>Email</Text>
                      <Input
                        value={values?.email}
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
                        {errors.email}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.company && touched.company}>
                      <Text fontWeight={"500"}>Компания</Text>
                      <Input
                        value={values?.company}
                        placeholder="Компания"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="company"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.company}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.post && touched.post}>
                      <Text fontWeight={"500"}>Должность</Text>
                      <Input
                        value={values?.post}
                        placeholder="Должность"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="post"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.post}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.inn && touched.inn}>
                      <Text fontWeight={"500"}>ИНН</Text>
                      <Input
                        value={values?.inn}
                        placeholder="ИНН"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="inn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.inn}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.ogrn && touched.ogrn}>
                      <Text fontWeight={"500"}>ОГРН</Text>
                      <Input
                        value={values?.ogrn}
                        placeholder="ОГРН"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="ogrn"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.ogrn}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl
                      isInvalid={errors.activity && touched.activity}
                    >
                      <Text fontWeight={"500"}>Направление деятельности</Text>
                      <Input
                        value={values?.activity}
                        placeholder="Направление деятельности"
                        marginTop={"4px"}
                        border={"2px solid #4682B4"}
                        borderRadius={"0"}
                        _hover={{ border: "2px solid #4682B4" }}
                        name="activity"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors.activity}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>

                  <Text color={"black"} fontWeight={"600"}>
                    Таймлайн
                  </Text>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalEditLead;
