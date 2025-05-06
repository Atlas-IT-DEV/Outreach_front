import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Modal,
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
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const ModalCreateLead = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  const toast = useToast();

  const [innValues, setInnValues] = useState("");

  const [pairs, setPairs] = useState([]);

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
    additions: "",
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Обязательное поле"),
    last_name: Yup.string().required("Обязательное поле"),
    phone: Yup.string()
      .required("Обязательное поле")
      .min(11, "Номер слишком короткий")
      .max(15, "Номер слишком длинный"),
    email: Yup.string().required("Обязательное поле"),
    additions: Yup.string().required("Обязательное поле"),
  });

  const createClient = async (values) => {
    return await pageStore.createClient(values);
  };
  const onSubmit = async (values) => {
    values.additions = JSON.stringify(pairs);
    const ok = await createClient(values);
    if (ok) {
      pageStore.getAllClients();
      toast({
        title: "Успех",
        description: "Новый лид успешно создан",
        duration: 3000,
        status: "success",
      });
      onClose();
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
        <Text fontSize={width >= 1000 ? "16px" : ["13px", "14px"]}>
          Создать нового лида
        </Text>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setPairs([]);
          onClose();
        }}
        onEsc={onClose}
        size={"5xl"}
      >
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Formik
            initialValues={clientValues}
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
                <VStack bg={"white"} width={"100%"} align={"flex-start"}>
                  {console.log(values)}
                  <Text
                    color={"black"}
                    fontWeight={"600"}
                    width={"100%"}
                    textAlign={"center"}
                  >
                    Создание лида
                  </Text>
                  <VStack width={"100%"} gap={"10px"} marginTop={"10px"}>
                    <FormControl
                      isInvalid={errors?.last_name && touched?.last_name}
                    >
                      <Text fontWeight={"500"}>Фамилия</Text>
                      <Input
                        placeholder="Фамилия"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
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
                        placeholder="Имя"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.first_name}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.phone && touched?.phone}>
                      <Text fontWeight={"500"}>Номер телефона</Text>
                      <Input
                        placeholder="Номер телефона"
                        marginTop={"4px"}
                        border={"2px solid rgba(48, 141, 218, 1)"}
                        borderRadius={"8px"}
                        _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormErrorMessage marginTop={"2px"}>
                        {errors?.director?.phone}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors?.email && touched?.email}>
                      <Text fontWeight={"500"}>email</Text>
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
                        {errors?.email}
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
                          _hover={{ border: "2px solid rgba(48, 141, 218, 1)" }}
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
                              border={"2px solid rgba(48, 141, 218, 1)"}
                              placeholder="Key"
                              value={pair.key}
                              onChange={(e) => {
                                hdChange(pair.id, "key", e.target.value);
                              }}
                            />
                            <Input
                              borderRadius={"8px"}
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
                      onClick={() =>
                        setFieldValue("additions", JSON.stringify(pairs))
                      }
                      type="submit"
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

export default ModalCreateLead;
