import {
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
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

const ModalScript = observer(({ obj = {} }) => {
  const { pageStore } = useStores();
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
      await pageStore.getAllScripts();
      toast({
        title: "Успех",
        description: "Скрипт успешно обновлен",
        duration: "3000",
        status: "success",
      });
      onClose();
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
        {obj?.is_fav ? (
          <MdOutlineStar size={"30px"} color="#4682B4" />
        ) : (
          <MdOutlineStarBorder size={"30px"} color="#4682B4" />
        )}
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} size={"full"} placement="right">
        <DrawerContent
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <DrawerCloseButton />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values, touched, errors, handleBlur, handleChange }) => (
              <Form
                style={{
                  width: "100%",
                  height: "auto",
                  minHeight: "100vh",
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
              >
                <VStack padding={"20px"} fontWeight={"600"}>
                  <VStack align={"flex-start"} width={"100%"}>
                    <Text>Цель рассылки</Text>
                    <Input
                      placeholder="Цель рассылки"
                      value={pageStore.selected_script?.purpose}
                    />
                  </VStack>
                  <VStack align={"flex-start"} width={"100%"}>
                    <Text>Целевая аудитория</Text>
                    <Input
                      placeholder="Целевая аудитория"
                      value={pageStore.selected_script?.targetAudience}
                    />
                  </VStack>
                  <VStack align={"flex-start"} width={"100%"}>
                    <Text>Предложение/продукт</Text>
                    <Input placeholder="Предложение/продукт" />
                  </VStack>
                  <VStack align={"flex-start"} width={"100%"}>
                    <Text>Целевое действие</Text>
                    <Input
                      placeholder="Целевое действие"
                      value={pageStore.selected_script?.targetAction}
                    />
                  </VStack>
                  <VStack align={"flex-start"} width={"100%"}>
                    <Text>Образ автора</Text>
                    <Input
                      placeholder="Образ автора"
                      value={pageStore.selected_script?.authorImage}
                    />
                  </VStack>
                  <VStack align={"flex-start"} width={"100%"}>
                    <Text>Прочее</Text>
                    <Textarea placeholder="Прочее" />
                  </VStack>
                  <FormControl isInvalid={errors?.name && touched?.name}>
                    <Text fontWeight={"500"}>Название</Text>
                    <Input
                      value={values?.name}
                      placeholder="Название"
                      marginTop={"4px"}
                      border={"2px solid #4682B4"}
                      borderRadius={"0"}
                      _hover={{ border: "2px solid #4682B4" }}
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormErrorMessage marginTop={"2px"}>
                      {errors?.name}
                    </FormErrorMessage>
                  </FormControl>
                  <VStack align={"flex-start"} width={"100%"}>
                    <FormControl isInvalid={errors?.text && touched?.name}>
                      <Text>Текст рассылки</Text>
                      <Textarea
                        placeholder="Текст рассылки"
                        name="text"
                        height={"200px"}
                        value={values?.text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.text}
                      </FormErrorMessage>
                    </FormControl>
                  </VStack>

                  <Stack
                    width={"100%"}
                    justify={"flex-end"}
                    flexDirection={width >= 600 ? "row" : "column"}
                  >
                    <ModalDeleteScript obj={obj} onСloses={() => onClose()} />
                    <Button
                      marginTop={"10px"}
                      boxShadow={"-2px 2px 0 0 #4682B4"}
                      borderRadius={"0px"}
                      border={"2px solid #4682B4"}
                      bg={"white"}
                      color={"black"}
                      _hover={{ bg: "#4682B4", color: "white" }}
                      flexShrink={width >= 600 ? 0 : 1}
                    >
                      <Text fontSize={width >= 1000 ? "16px" : "14px"}>
                        Сгенерировать текст рассылки
                      </Text>
                    </Button>
                    <Button
                      type="submit"
                      marginTop={"10px"}
                      boxShadow={"-2px 2px 0 0 #4682B4"}
                      borderRadius={"0px"}
                      border={"2px solid #4682B4"}
                      bg={"white"}
                      color={"black"}
                      _hover={{ bg: "#4682B4", color: "white" }}
                      flexShrink={width >= 600 ? 0 : 1}
                    >
                      <Text fontSize={width >= 1000 ? "16px" : "14px"}>
                        Сохранить
                      </Text>
                    </Button>
                  </Stack>
                </VStack>
              </Form>
            )}
          </Formik>
        </DrawerContent>
      </Drawer>
    </>
  );
});

export default ModalScript;
