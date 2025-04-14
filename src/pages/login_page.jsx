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
import { useNavigate } from "react-router";

import { useDisclosure } from "@chakra-ui/react";

import { useStores } from "../store/store_context";
import { FcGoogle } from "react-icons/fc";

import Cookies from "js-cookie";
import LoginForm from "../components/login_form";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { pageStore } = useStores();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <LoginForm />

        {/* <HStack
          border="1px solid #4682B4"
          _hover={{ bg: "#4682B4", color: "white" }}
          padding={"5px 15px"}
          borderRadius={"8px"}
          cursor={"pointer"}
        >
          <Text color={"black"} fontWeight={500}>
            Вход
          </Text>
          <FcGoogle />
        </HStack> */}

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
