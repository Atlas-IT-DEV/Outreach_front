import React, { useEffect, useState } from "react";
import {
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Checkbox,
  Text,
  IconButton,
  Flex,
  Link,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router";
import CryptoJS from "crypto-js";
import { useDisclosure } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useStores } from "../store/store_context";
import { FcGoogle } from "react-icons/fc";

import Cookies from "js-cookie";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { pageStore } = useStores();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values) => {
    console.log("Form data:", values);
    if (
      CryptoJS.SHA256(`${values.email}${values.password}`).toString() ==
      "e1d093abf5e7f41602ea7e9dbd53c78b31649571d287af1d0c47bf66f83d3486"
    ) {
      if (values.rememberMe) {
        Cookies.set(
          "authed",
          CryptoJS.SHA256(`${values.email}${values.password}`).toString(),
          { expires: 365 }
        );
      }
      navigate("/main");
    } else {
      alert("Неверные данные!");
    }
  };
  const handleError = (error) => {
    console.log(error);
    alert("К сожалению, произошла ошибка при авторизации. Попоробуйте позднее");
  };
  const handleSuccess = (response) => {
    try {
      const decoded = jwtDecode(response.credential);
      console.log(response);

      localStorage.setItem(
        "access_token",
        CryptoJS.SHA256(
          `${decoded.sub}${decoded.issuer}${decoded.aud}${decoded.azp}`
        ).toString()
      );
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };
  const check_ref_token = async () => {
    const ref_token = localStorage.getItem("g_point");
    const response = await fetch(
      `https://me-course.com:8069/api/users/auth/google/refresh?refresh_token=${ref_token}`,
      {
        method: "POST",
        headers: { accept: "application/json" },
        body: JSON.stringify({}),
      }
    );
    const result = await response.json();
    if (response.ok) {
      const response_user_info = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${result.access_token}` },
        }
      );
      const result_user_info = await response_user_info.json();
      console.log(result_user_info);
      await pageStore.try_login(result_user_info.email, result_user_info.sub);
      await pageStore.get_user_data(result_user_info.sub);
      // Получаем текущий URL
      const currentUrl = window.location.href;

      // Извлекаем часть пути после последнего слэша
      const lastSegment = currentUrl.split("/").pop();

      console.log(lastSegment); // Выведет строку после последнего слэша

      navigate("/main", { state: { segment: lastSegment } });
    }
  };
  useEffect(() => {
    check_ref_token();
  }, []);
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Auth Code:", response.code); // Отправь код на сервер
      const response_auth = await fetch(
        `https://me-course.com:8069/api/users/auth/google?code=${response.code}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      const result = await response_auth.json();
      const response_user_info = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${result.access_token}` },
        }
      );
      const result_user_info = await response_user_info.json();
      console.log(result_user_info);
      const try_login = await pageStore.try_login(
        result_user_info.email,
        result_user_info.sub
      );
      if (try_login.ok) {
        pageStore.get_user_data(result_user_info.sub);
        localStorage.setItem("o_point", result.refresh_token);
        // Получаем текущий URL
        const currentUrl = window.location.href;

        // Извлекаем часть пути после последнего слэша
        const lastSegment = currentUrl.split("/").pop();

        console.log(lastSegment); // Выведет строку после последнего слэша

        navigate("/main", { state: { segment: lastSegment } });
      } else {
        const resp = await pageStore.createUser({
          id: `${result_user_info.sub}`,
          email: result_user_info.email,
          avatar_url: result_user_info.picture,
          first_name: result_user_info.given_name,
          last_name: result_user_info.family_name,
          country: "null",
          phone: result_user_info.sub,
          role: "U",
          additional_data: JSON.stringify({
            email: result_user_info.email,
            first_name: result_user_info.given_name,
            last_name: result_user_info.family_name,
            id: result_user_info.sub,
          }),
        });
        if (resp.ok) {
          pageStore.get_user_data(result_user_info.sub);
          localStorage.setItem("o_point", result.refresh_token);
          // Получаем текущий URL
          const currentUrl = window.location.href;

          // Извлекаем часть пути после последнего слэша
          const lastSegment = currentUrl.split("/").pop();

          console.log(lastSegment); // Выведет строку после последнего слэша

          navigate("/main", { state: { segment: lastSegment } });
        }
      }
    },
    flow: "auth-code", // Важно! Меняем flow на "auth-code"
  });

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      color="white"
      width={"100%"}
      minH={"90vh"}
      backgroundColor={"#FFFFFFFF"}
    >
      <VStack backgroundColor={"transparent"} p={8} maxW={"600px"} spacing={2}>
        <HStack>
          <Text
            color={"#4682B4"}
            fontWeight={"700"}
            fontSize={"40px"}
            alignSelf={"center"}
          >
            OUTREACH
          </Text>
          <Text
            color={"black"}
            fontWeight={"700"}
            fontSize={"40px"}
            alignSelf={"center"}
          >
            360
          </Text>
        </HStack>

        <Text textAlign="center" color={"black"}>
          Войдите в свой аккаунт
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <VStack spacing={2}>
                {/* Email Field */}
                <FormControl
                  isInvalid={errors.email && touched.email}
                  margin={0}
                  padding={0}
                >
                  <FormLabel color={"black"}>Email</FormLabel>
                  <Field
                    as={Input}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    bg="transparent"
                    color="black"
                    borderRadius={0}
                    _placeholder={{ color: "gray.400" }}
                    width={"20vw"}
                    minW={"300px"}
                    borderColor="#4682B4" // Цвет рамки
                    focusBorderColor="#4682B4" // Цвет рамки при фокусе
                  />
                  {errors.email && touched.email && (
                    <Text color="red.500" fontSize="sm">
                      {errors.email}
                    </Text>
                  )}
                </FormControl>

                {/* Password Field */}
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
                      type={showPassword ? "text" : "password"}
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
                    <IconButton
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={togglePasswordVisibility}
                      size="sm"
                      variant="ghost"
                      position="absolute"
                      right={2}
                      top="50%"
                      transform="translateY(-50%)"
                      color="black"
                    />
                  </Flex>
                  {errors.password && touched.password && (
                    <Text color="red.500" fontSize="sm">
                      {errors.password}
                    </Text>
                  )}
                </FormControl>

                {/* Remember Me */}
                <Field
                  as={Checkbox}
                  name="rememberMe"
                  alignSelf="flex-start"
                  color={"black"}
                  iconColor="#4682B4" // Цвет галочки
                  borderColor="#4682B4"
                >
                  Запомнить меня
                </Field>

                {/* Submit Button */}
                <Button
                  mt={"20px"}
                  mb={"20px"}
                  type="submit"
                  width="full"
                  bg="#4682B4"
                  _hover={{ bg: "#4682B4" }}
                  color={"white"}
                  onClick={() => navigate("/main")}
                >
                  Вход
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
        <HStack
          border="1px solid #4682B4"
          _hover={{ bg: "#4682B4", color: "white" }}
          padding={"5px 15px"}
          borderRadius={"8px"}
          cursor={"pointer"}
          onClick={login}
        >
          <Text color={"black"} fontWeight={500}>
            Вход
          </Text>
          <FcGoogle />
        </HStack>

        <Flex justify="center" mt={4}>
          <Link color="#4682B4" href="#" fontSize="sm" onClick={() => onOpen()}>
            Забыли пароль?
          </Link>
          <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent bgColor={"white"} color={"white"}>
              <ModalHeader color={"black"}>Забыл пароль?</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text color={"black"}>
                  Восстановление доступно только для администраторов
                  авторизующихся по почте, свяжитесь с тех поддержкой в телеграм
                </Text>
                <Link href="https://t.me/AtlasCEO_77" color={"#4682B4"}>
                  @AtlasCEO_77
                </Link>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </VStack>
    </Flex>
  );
};

export default LoginPage;
