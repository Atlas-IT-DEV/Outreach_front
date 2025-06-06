import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const ModalEditLead = observer(({ obj = {} }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [innValues, setInnValues] = useState("");
  const { pageStore } = useStores();
  const toast = useToast();

  const [pairs, setPairs] = useState(JSON.parse(obj?.additions));
  console.log("pairs", pairs);

  const [editUsers, setEditUsers] = useState(false);

  const addPair = () => {
    setPairs([...pairs, { id: Date.now(), key: "", value: "" }]);
  };

  const removePair = (id) => {
    if (pairs.length <= 1) return; // Оставляем хотя бы одну пару
    setPairs(pairs.filter((pair) => pair.id !== id));
  };

  const hdChange = (id, field, value) => {
    setPairs(
      pairs?.map((pair) =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };

  const editClient = async (id, values) => {
    return await pageStore.editClient(id, values);
  };

  const getCompanyByINN = async (values) => {
    const response = await fetch(
      "http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Token 96d81fed256fcf8842ec456e35e134f5aa9e1fa0",
        },
        body: JSON.stringify({
          query: values,
        }),
      }
    );
    const result = await response.json();
    console.log("asdasdasd", result.suggestions[0]?.data);
    if (result.suggestions[0]?.value) {
      setPairs([
        ...pairs,
        {
          id: Math.random() * 10000,
          key: "Наименование компании",
          value: result.suggestions[0]?.value,
        },
      ]);
    }
    setPairs([
      ...pairs,
      ...Object.keys(result.suggestions[0]?.data)
        .map((key_name) => {
          if (
            result.suggestions[0]?.data?.[`${key_name}`] &&
            typeof result.suggestions[0]?.data?.[`${key_name}`] != "object" &&
            typeof result.suggestions[0]?.data?.[`${key_name}`] != "symbol" &&
            typeof result.suggestions[0]?.data?.[`${key_name}`] != "undefined"
          ) {
            return {
              id: Math.random() * 10000,
              key:
                key_name == "kpp"
                  ? "КПП"
                  : key_name == "branch_type"
                  ? "Тип подразделения"
                  : key_name == "inn"
                  ? "ИНН"
                  : key_name == "ogrn"
                  ? "ОГРН"
                  : key_name == "ogrn_date"
                  ? "Дата выдачи ОГРН"
                  : key_name == "type"
                  ? "Тип организации"
                  : key_name == "okpo"
                  ? "Код ОКПО"
                  : key_name == "oktmo"
                  ? "Код ОКТМО"
                  : key_name == "okato"
                  ? "Код ОКАТО"
                  : key_name == "okogu"
                  ? "Код ОКОГУ"
                  : key_name == "okfs"
                  ? "Код ОКФС"
                  : key_name == "okved"
                  ? "Код ОКВЭД"
                  : key_name == "okved_type"
                  ? "Версия справочника ОКВЭД"
                  : key_name,
              value:
                result.suggestions[0]?.data?.[key_name] == "INDIVIDUAL"
                  ? "Индивидуальный предприниматель"
                  : result.suggestions[0]?.data?.[key_name] == "LEGAL"
                  ? "Юридическое лицо"
                  : result.suggestions[0]?.data?.[key_name] == "MAIN"
                  ? "Головная организация"
                  : result.suggestions[0]?.data?.[key_name] == "BRANCH"
                  ? "Филиал"
                  : result.suggestions[0]?.data?.[key_name],
            };
          }
        })
        .filter((elem) => elem),
    ]);
    console.log("pairs", pairs);
  };

  const clientValues = {
    additions: obj?.additions,
    email: obj?.email,
    first_name: obj?.first_name,
    last_name: obj?.last_name,
    phone: obj?.phone,
  };

  const clientValidationSchema = Yup.object({
    additions: Yup.string().required("Обязательное поле"),
    email: Yup.string().required("Обязательное поле"),
    first_name: Yup.string().required("Обязательное поле"),
    last_name: Yup.string().required("Обязательное поле"),
    phone: Yup.string().required("Обязательное поле"),
  });

  const onUserSumbit = async (values) => {
    values.additions = JSON.stringify(pairs);
    console.log("vals", values);
    const ok = await editClient(obj?.ID, values);
    if (ok) {
      setEditUsers(false);
      pageStore.getAllClients();
      toast({
        title: "Успех",
        description: "Данные об админе обновлены",
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
          setEditUsers(false);
          setPairs([]);
        }}
        onEsc={() => {
          onClose();
          setEditUsers(false);
          setPairs([]);
        }}
        size={"5xl"}
      >
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <VStack bg={"white"} width={"100%"} align={"flex-start"}>
            {editUsers ? (
              <Formik
                initialValues={clientValues}
                validationSchema={clientValidationSchema}
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
                    >
                      <Text
                        fontWeight={"600"}
                        width={"100%"}
                        textAlign={"center"}
                      >
                        Редактирование клиента
                      </Text>

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
                          _hover={{
                            border: "2px solid rgba(48, 141, 218, 1)",
                          }}
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
                          _hover={{
                            border: "2px solid rgba(48, 141, 218, 1)",
                          }}
                          name="first_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage marginTop={"2px"}>
                          {errors?.first_name}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={errors?.email && touched?.email}>
                        <Text fontWeight={"500"}>Email</Text>
                        <Input
                          value={values?.email}
                          placeholder="Email"
                          width={"100%"}
                          marginTop={"4px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          borderRadius={"8px"}
                          _hover={{
                            border: "2px solid rgba(48, 141, 218, 1)",
                          }}
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage marginTop={"2px"}>
                          {errors?.email}
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
                          _hover={{
                            border: "2px solid rgba(48, 141, 218, 1)",
                          }}
                          name="phone"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormErrorMessage marginTop={"2px"}>
                          {errors?.phone}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl
                        isInvalid={errors?.additions && touched?.additions}
                      >
                        <Text fontWeight={"500"}>Доп. информация</Text>
                        <HStack width={"100%"}>
                          <Input
                            value={innValues}
                            onChange={(e) => setInnValues(e.target.value)}
                            placeholder="ПОИСК ПО ИНН"
                            marginTop={"4px"}
                            border={"2px solid rgba(48, 141, 218, 1)"}
                            borderRadius={"8px"}
                            _hover={{
                              border: "2px solid rgba(48, 141, 218, 1)",
                            }}
                            name="inn"
                          />
                          <Button
                            onClick={async () => {
                              setPairs([]);
                              await getCompanyByINN(innValues);
                            }}
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
                            <Text>Найти</Text>
                          </Button>
                        </HStack>
                        <VStack width={"100%"} marginTop={"10px"}>
                          {pairs?.map((pair) => (
                            <HStack key={pair.id} spacing={3} width={"100%"}>
                              <Input
                                borderRadius={"8px"}
                                width={"100%"}
                                border={"2px solid rgba(48, 141, 218, 1)"}
                                placeholder="Key"
                                value={pair.key}
                                onChange={(e) => {
                                  hdChange(pair.id, "key", e.target.value);
                                }}
                              />
                              <Input
                                borderRadius={"8px"}
                                width={"100%"}
                                border={"2px solid rgba(48, 141, 218, 1)"}
                                placeholder="Value"
                                value={pair.value}
                                onChange={(e) => {
                                  hdChange(pair.id, "value", e.target.value);
                                }}
                              />
                              <IconButton
                                borderRadius={"8px"}
                                aria-label="Remove pair"
                                icon={<DeleteIcon />}
                                colorScheme="red"
                                onClick={() => removePair(pair.id)}
                                isDisabled={pairs.length <= 1}
                              />
                            </HStack>
                          ))}
                        </VStack>

                        <IconButton
                          width={"100%"}
                          icon={<AddIcon />}
                          bgColor="rgba(48, 141, 218, 1)"
                          color={"white"}
                          onClick={addPair}
                          mt={4}
                          borderRadius={"8px"}
                        />

                        <FormErrorMessage marginTop={"2px"}>
                          {errors?.additions}
                        </FormErrorMessage>
                      </FormControl>

                      <HStack width={"100%"} justify={"center"}>
                        <Button
                          onClick={() => setEditUsers(false)}
                          borderRadius={"8px"}
                          border={"2px solid rgba(48, 141, 218, 1)"}
                          bg={"white"}
                          color={"black"}
                          _hover={{
                            bg: "rgba(48, 141, 218, 1)",
                            color: "white",
                          }}
                          flexShrink={0}
                          marginTop={"20px"}
                        >
                          <Text>Отменить</Text>
                        </Button>
                        <Button
                          onClick={() =>
                            setFieldValue("additions", JSON.stringify(pairs))
                          }
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
                <Text fontWeight={"600"}>Информация о клиенте</Text>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Фамилия</Text>
                  <Text fontSize={"14px"}>{obj?.last_name || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Имя</Text>
                  <Text fontSize={"14px"}>{obj?.first_name || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Email</Text>
                  <Text fontSize={"14px"}>{obj?.email || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Номер телефона</Text>
                  <Text fontSize={"14px"}>{obj?.phone || "-"}</Text>
                </VStack>
                <VStack
                  align={"flex-start"}
                  justify={"flex-start"}
                  width={"100%"}
                  gap={0}
                >
                  <Text fontWeight={"500"}>Доп. информация</Text>
                  {pairs.length > 0
                    ? pairs?.map((item, index) => (
                        <Text fontSize={"14px"} key={index}>
                          {index + 1}. {item?.key}: {item?.value}
                        </Text>
                      ))
                    : null}
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
                  <Text>Редактировать клиента</Text>
                </Button>
              </VStack>
            )}

            <VStack width={"100%"} gap={"10px"} marginTop={"10px"}></VStack>
          </VStack>
          <HStack width={"100%"} justifyContent={"flex-end"}>
            <Button
              onClick={() => {
                onClose();
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

export default ModalEditLead;
