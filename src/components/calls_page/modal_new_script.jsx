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
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import useWindowDimensions from "../../windowDimensions";
import { useStores } from "../../store/store_context";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const ModalNewScript = observer(() => {
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();
  const toast = useToast();
  const [showInputs, setShowInputs] = useState(false);

  const [product, setProduct] = useState("");
  const [author, setAuthor] = useState("");
  const [isGenerate, setIsGenerate] = useState(false);

  useEffect(() => {
    setProduct("");
    setAuthor("");
    pageStore.updateGenerateText("");
    setShowInputs(false);
  }, [isOpen]);

  const initialValues = {
    department_id: pageStore.selected_department,
    is_email: false,
    is_hiden: false,
    name: "",
    text: pageStore.generateText?.answer || "",
  };

  const validationSchema = Yup.object({
    department_id: Yup.number().required("Обязательное поле"),
    name: Yup.string().required("Обязательное поле"),
    text: Yup.string().required("Обязательное поле"),
  });

  const createScript = async (values) => {
    return await pageStore.createScript(values);
  };

  const onSubmit = async (values) => {
    const ok = await createScript(values);
    if (ok) {
      pageStore.getAllScripts();
      toast({
        title: "Успех",
        description: "Скрипт создан успешно",
        duration: "3000",
        status: "success",
      });
      onClose();
    }
  };

  const generateText = async (values) => {
    return await pageStore.generateGPT(values);
  };

  const generate = async (setFieldValue) => {
    setIsGenerate(true);
    const ok = await generateText(
      `Сгенерируй мне текст email письма для рассылки клиентам. предложение ${product}, о компании: ${author}.`
    );
    if (ok) {
      setFieldValue("text", pageStore.generateText?.answer || "");
      toast({
        title: "Успех",
        description: "Текст успешно сгенерирован",
        duration: "3000",
        status: "success",
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        border={"2px solid rgba(48, 141, 218, 1)"}
        borderRadius={"8px"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
      >
        <Text fontSize={width >= 1000 ? "16px" : "14px"}>Новый скрипт</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text width={"100%"} textAlign={"center"} fontWeight={"600"}>
            Создание скрипта
          </Text>
          <Formik
            initialValues={initialValues}
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
              <Form style={{ width: "100%" }}>
                <VStack
                  width={"100%"}
                  marginTop={"10px"}
                  align={"flex-start"}
                  justify={"flex-start"}
                  gap={"10px"}
                >
                  <FormControl isInvalid={errors?.name && touched?.name}>
                    <Text fontWeight={"500"}>Название</Text>
                    <Input
                      placeholder="Название"
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
                  <FormControl isInvalid={errors?.text && touched?.text}>
                    <Text fontWeight={"500"}>Текст</Text>
                    <Textarea
                      minHeight={"500px"}
                      value={values?.text}
                      height={"auto"}
                      placeholder="Текст"
                      marginTop={"4px"}
                      border={"2px solid rgba(48, 141, 218, 1)"}
                      borderRadius={"8px"}
                      _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                      name="text"
                      onChange={(e) => setFieldValue("text", e.target.value)}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage marginTop={"2px"}>
                      {errors?.text}
                    </FormErrorMessage>
                  </FormControl>

                  {showInputs && (
                    <>
                      <Text fontWeight={"500"}>Информация о компании</Text>
                      <Textarea
                        value={author}
                        placeholder="Текст"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                      <Text fontWeight={"500"}>Предложение/продукт</Text>
                      <Textarea
                        value={product}
                        placeholder="Текст"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        onChange={(e) => setProduct(e.target.value)}
                      />

                      <Button
                        onClick={async () => await generate(setFieldValue)}
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        Сгенерировать текст {isGenerate ? "повторно" : null}
                      </Button>
                    </>
                  )}
                  {width >= 600 ? (
                    <HStack
                      marginTop={"20px"}
                      justify={"flex-end"}
                      width={"100%"}
                    >
                      <Button
                        onClick={() => setShowInputs(!showInputs)}
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>
                          {!showInputs
                            ? "Перейти к генерации"
                            : "Скрыть генерацию"}
                        </Text>
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
                        <Text>Создать скрипт</Text>
                      </Button>
                    </HStack>
                  ) : (
                    <VStack
                      marginTop={"20px"}
                      align={"flex-end"}
                      width={"100%"}
                    >
                      <Button
                        onClick={() => setShowInputs(!showInputs)}
                        borderRadius={"8px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        bg={"white"}
                        color={"black"}
                        _hover={{ bg: "rgba(48, 141, 218, 1)", color: "white" }}
                        flexShrink={0}
                      >
                        <Text>
                          {!showInputs
                            ? "Перейти к генерации"
                            : "Скрыть генерацию"}
                        </Text>
                      </Button>
                      <HStack width={"100%"} justify={"flex-end"}>
                        <Button
                          onClick={onClose}
                          borderRadius={"8px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          bg={"white"}
                          color={"black"}
                          _hover={{
                            bg: "rgba(48, 141, 218, 1)",
                            color: "white",
                          }}
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
                          _hover={{
                            bg: "rgba(48, 141, 218, 1)",
                            color: "white",
                          }}
                          flexShrink={0}
                        >
                          <Text>Создать скрипт</Text>
                        </Button>
                      </HStack>
                    </VStack>
                  )}
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalNewScript;
