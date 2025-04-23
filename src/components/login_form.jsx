import {
  Button,
  Flex,
  FormControl,
  FormLabel,
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
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useStores } from "../store/store_context";
import { useState } from "react";

const LoginForm = observer(() => {
  const navigate = useNavigate();
  const { pageStore } = useStores();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredCompany, setFilteredCompany] = useState({});

  const initialValues = {
    username: "testusername",
    password: "qwerty",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Обязательное поле"),
    password: Yup.string().required("Обязательное поле"),
  });

  const login = async (values) => {
    return await pageStore.login(values);
  };

  const handleSubmit = async (values) => {
    const ok = await login(values);
    if (ok) {
      await pageStore.getAllCompanies();

      const filterCompany = pageStore.clients.find(
        (item) => item?.ID == pageStore.user_info?.company_id
      );
      if (pageStore.user_info?.role == "0") {
        navigate("/crm");
      } else {
        setFilteredCompany(filterCompany || {});
        onOpen();
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <VStack spacing={2}>
              <FormControl
                isInvalid={errors.username && touched.username}
                margin={0}
                padding={0}
              >
                <FormLabel color={"black"}>Username</FormLabel>
                <Field
                  as={Input}
                  name="username"
                  placeholder="Enter your username"
                  bg="transparent"
                  color="black"
                  borderRadius={0}
                  _placeholder={{ color: "gray.400" }}
                  width={"20vw"}
                  minW={"300px"}
                  borderColor="#4682B4" // Цвет рамки
                  focusBorderColor="#4682B4" // Цвет рамки при фокусе
                />
                {errors.username && touched.username && (
                  <Text color="red.500" fontSize="sm">
                    {errors.username}
                  </Text>
                )}
              </FormControl>

              <FormControl
                isInvalid={errors.password && touched.password}
                margin={0}
                padding={0}
              >
                <FormLabel color={"black"}>Пароль</FormLabel>
                <Flex align="center" position="relative">
                  <Field
                    as={Input}
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    bg="transparent"
                    color="black"
                    borderRadius={0}
                    _placeholder={{ color: "gray.400" }}
                    width={"20vw"}
                    minW={"300px"}
                    borderColor="#4682B4" // Цвет рамки
                    focusBorderColor="#4682B4" // Цвет рамки при фокусе
                  />
                </Flex>
                {errors.password && touched.password && (
                  <Text color="red.500" fontSize="sm">
                    {errors.password}
                  </Text>
                )}
              </FormControl>

              <Button
                mt={"20px"}
                mb={"20px"}
                type="submit"
                width="full"
                bg="#4682B4"
                _hover={{ bg: "#4682B4" }}
                color={"white"}
              >
                Вход
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text fontWeight={"600"} width={"100%"} textAlign={"center"}>
            Выберите <br />
            департамент
          </Text>
          <RadioGroup
            value={pageStore.selected_department}
            onChange={(e) => pageStore.updateSelectedDepartament(Number(e))}
          >
            <VStack
              width={"100%"}
              align={"flex-start"}
              justify={"flex-start"}
              gap={"5px"}
              marginTop={"10px"}
            >
              {filteredCompany.departaments
                ? filteredCompany.departaments.map((item, index) => {
                    return (
                      <Radio
                        key={index}
                        value={item?.ID}
                      >{`${item?.ID} ${item?.name}`}</Radio>
                    );
                  })
                : null}
            </VStack>
          </RadioGroup>
          {!pageStore.selected_department && (
            <Text fontSize={"14px"} color={"red"}>
              Выберите департамент
            </Text>
          )}

          <HStack marginTop={"20px"} justify={"flex-end"} width={"100%"}>
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
              onClick={() =>
                pageStore.selected_department ? navigate("/crm") : null
              }
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"1px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
              flexShrink={0}
            >
              <Text>Выбрать</Text>
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default LoginForm;
