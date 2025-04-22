import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { useStores } from "../store/store_context";

const LoginForm = observer(() => {
  const navigate = useNavigate();
  const { pageStore } = useStores();

  const initialValues = {
    username: "admin",
    password: "admin",
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
      navigate("/crm");
    }
  };
  return (
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
  );
});

export default LoginForm;
