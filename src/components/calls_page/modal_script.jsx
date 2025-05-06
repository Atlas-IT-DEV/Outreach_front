import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { MdOutlineStar, MdOutlineStarBorder } from "react-icons/md";
import useWindowDimensions from "../../windowDimensions";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { Form, Formik } from "formik";
import ModalDeleteScript from "../modal_delete_script";
import { useEffect, useState } from "react";

const ModalScript = observer(({ obj = {} }) => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [showInputs, setShowInputs] = useState(false);
  const [isGenerate, setIsGenerate] = useState(false);

  const [target, setTarget] = useState("");
  const [audit, setAudit] = useState("");
  const [product, setProduct] = useState("");
  const [author, setAuthor] = useState("");
  const [pro, setPro] = useState("");

  useEffect(() => {
    setTarget("");
    setAudit("");
    setProduct("");
    setAuthor("");
    setPro("");
    pageStore.updateGenerateText("");
    setShowInputs(false);
  }, [isOpen]);

  const editScript = async (id, values) => {
    return await pageStore.editScript(id, values);
  };

  const initialValues = {
    creator_id: obj?.creator_id,
    department_id: pageStore.selected_department,
    is_email: obj?.is_email,
    is_hiden: false,
    name: obj?.name,
    text: obj?.text,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Обязательное поле"),
    text: Yup.string().required("Обязательное поле"),
  });

  const onSubmit = async (values) => {
    const ok = await editScript(obj?.ID, values);
    if (ok) {
      pageStore.getAllScripts();
      toast({
        title: "Успех",
        description: "Скрипт успешно обновлен",
        duration: "3000",
        status: "success",
      });
      onClose();
    }
  };

  console.log("Favorite scripts:", pageStore.user_info?.favorite_scripts);
  console.log("Current obj:", obj);
  console.log(
    "Comparison result:",
    pageStore.user_info?.favorite_scripts?.some((item) => item?.ID === obj?.ID)
  );
  const generateText = async (values) => {
    return await pageStore.generateGPT(values);
  };

  const generate = async (setFieldValue) => {
    setIsGenerate(true);
    const ok = await generateText(
      `Сгенерируй мне текст email письма для рассылки клиентам с целью ${target}, целевая аудитория: ${audit}, предложение ${product}, образ автора: ${author}. ${pro}`
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

  const addToFav = async (id) => {
    return await pageStore.addToFavouriveScript(id);
  };

  const handleAddToFav = async () => {
    const ok = await addToFav(obj?.ID);
    if (ok) {
      await pageStore.getMe();
    }
  };

  return (
    <>
      <HStack
        onClick={onOpen}
        bg={
          pageStore.selected_script?.ID == obj?.ID
            ? "rgba(200,200,200,0.5)"
            : null
        }
        padding={"10px 5px"}
        width={"100%"}
        justify={"space-between"}
        borderBottom={"1px solid black"}
        cursor={"pointer"}
        _hover={{
          bg: "rgba(200,200,200,0.5)",
        }}
      >
        <Text color={"black"}>{obj?.name}</Text>
        {pageStore.user_info?.favorite_scripts?.some(
          (item) => item?.ID == obj?.ID
        ) ? (
          <MdOutlineStar
            size={"30px"}
            color="rgba(48, 141, 218, 1)"
            onClick={async (e) => {
              e.stopPropagation();
              await handleAddToFav();
            }}
          />
        ) : (
          <MdOutlineStarBorder
            size={"30px"}
            color="rgba(48, 141, 218, 1)"
            onClick={async (e) => {
              e.stopPropagation();
              await handleAddToFav();
            }}
          />
        )}
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"20px"}
        >
          <ModalCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
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
                      value={values?.name}
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
                      value={values?.text}
                      minH={"500px"}
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

                  <HStack
                    marginTop={"20px"}
                    justify={"flex-end"}
                    width={"100%"}
                  >
                    <ModalDeleteScript obj={obj} />
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
                      <Text>Сохранить обновлённую версию скрипта</Text>
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

export default ModalScript;
