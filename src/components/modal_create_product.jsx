import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
  Button,
  VStack,
  Box,
  HStack,
  Text,
  Image,
  Textarea,
  Indicator,
  CircularProgress,
  CircularProgressLabel,
  Spinner,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import SpinnerCustom from "./spinner_custom";

const ModalCreateProduct = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { pageStore } = useStores();

  const [curCreated, setCurCreated] = useState(0);
  const [curInput, setCurInput] = useState("0 0 0");
  const [createdCurId, setCreatedCurId] = useState(1);
  const [file, setFile] = useState(null);
  const [productId, setProductId] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [audio, setAudio] = useState(null);
  const [description, setDescription] = useState("");
  const [autonomy, setAutonomy] = useState(1);
  const [sound, setSound] = useState(1);
  const [micro, setMicro] = useState(1);
  const [complect, setComplect] = useState("");
  const [funcs, setFuncs] = useState("");
  const [techs, setTechs] = useState("");
  const [indicator, setIndicator] = useState(null);
  const createCurrency = async () => {
    let transformedInput = curInput.split(" ").map((elem) => Number(elem));
    console.log(transformedInput);
    let resultedValues = {
      id: 1,
      ru: transformedInput[0],
      eu: transformedInput[1],
      br: transformedInput[2],
    };
    const response = await fetch("https://apbstore.ru:8008/currencies/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(resultedValues),
    });
    if (response.ok) {
      const result = await response.json();
      setCreatedCurId(result?.id);
      toast({
        title: "Цена товара успешно подтверждена.",
        description:
          "Валюта подтверждена ЦБ РФ и одобрена высшими инстанциями (шутка)",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Цена товара не подтверждена.",
        description:
          "Возможно формат ввода неправильный либо на сервере произошла какая-то ошибка",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const createProduct = async (values) => {
    const response = await fetch("https://apbstore.ru:8008/products/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    console.log(result);
    setProductId(result.id);
    return result.id;
  };
  const uploadImageMain = async (productId) => {
    if (!file || !productId) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл и укажите ID продукта",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_id", productId);
    formData.append("color", "");
    console.log(productId);
    const response = await fetch(
      "https://apbstore.ru:8008/image_upload/product/main",
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      }
    );
    return response.ok;
  };
  const uploadImageAdditionals = async (productId) => {
    if (!additionalFiles || !productId) {
      return;
    }

    const formData = new FormData();
    additionalFiles.map((elem) => {
      formData.append("files", elem.url);
    });
    formData.append("product_id", productId);
    formData.append(
      "colors",
      additionalFiles.reduce((acc, elem) => acc + `${elem.color},`, "")
    );

    console.log(
      additionalFiles.reduce((acc, elem) => acc + `${elem.color},`, "")
    );

    const response = await fetch(
      "https://apbstore.ru:8008/image_upload/product/additional",
      {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      }
    );
    return response.ok;
  };
  const uploadAudio = async (productId) => {
    if (!audio || !productId) {
      return;
    }

    const formData = new FormData();
    formData.append("ProductID", productId);
    formData.append("OriginalUrl", audio, audio.name); // Пустое значение
    formData.append("OurUrl", audio, audio.name); // Добавляем файл

    try {
      const response = await fetch("https://apbstore.ru:8008/product/audio/", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        return true;
      } else {
        console.error("Upload failed:", response.statusText);
        return false;
      }
      return response.ok;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };
  const uploadChars = async (
    values = {
      id: 0,
      product_id: 2,
      characteristic_id: 2,
      value: "35",
    }
  ) => {
    const response = await fetch(
      "https://apbstore.ru:8008/product_characteristics/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    return response.ok;
  };
  const handleFileChange = (e) => {
    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handleFileChangeAdd = (e) => {
    setAdditionalFiles(
      Array.from(e.target.files).map((elem) => {
        return { url: elem, color: "null" };
      })
    );
    console.log(e.target.files);
  };
  const handleFileChangeAudio = (e) => {
    setAudio(e.target.files[0]);
  };

  // Валидация полей формы
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Имя обязательно")
      .min(2, "Имя должно содержать хотя бы 2 символа"),
    category_id: Yup.number()
      .required("Необходимо указать категорию товара")
      .typeError("Категория должна быть числом"),
    price: Yup.number()
      .required("Необходимо указать цену товара")
      .typeError("Цена должна быть числом"),
    is_active: Yup.string()
      .oneOf(["Y", "N"], "Значение должно быть 'Y' или 'N'")
      .required("Обязательно укажите статус публикации"),
    position: Yup.number()
      .required("Необходимо указать позицию товара")
      .typeError("Позиция должна быть числом"),
  });

  return (
    <>
      <Button onClick={onOpen} bgColor={"rgb(73, 69, 255)"}>
        Добавить товар
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(33, 33, 52)" color="white">
          <ModalHeader>Создание товара</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                id: 0,
                name: "",
                promotion_id: 1,
                currency_id: 2,
                company_id: 1,
                category_id: 2,
                price: 0,
                is_active: "Y",
                position: 1000,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                values = { ...values, currency_id: createdCurId };
                console.log(values); // Обработка данных
                setIndicator(<SpinnerCustom text={"Создаю товар"} />);

                let prod_id = await createProduct(values);

                if (prod_id) {
                  setIndicator(
                    <SpinnerCustom text={"Загружаю главное изображение"} />
                  );
                  await uploadImageMain(prod_id);
                  setIndicator(
                    <SpinnerCustom text={"Загружаю цвета и изображения"} />
                  );
                  await uploadImageAdditionals(prod_id);
                  setIndicator(
                    <SpinnerCustom text={"Загружаю доп информацию"} />
                  );
                  Promise.all([
                    uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 4,
                      value: String(autonomy),
                    }),
                    uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 6,
                      value:
                        String(description) != ""
                          ? String(description)
                          : "Тут ничего нет",
                    }),
                    await uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 7,
                      value: String(sound),
                    }),
                    uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 8,
                      value: String(micro),
                    }),
                    uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 9,
                      value:
                        String(complect) != ""
                          ? String(complect)
                          : "Тут ничего нет",
                    }),
                    uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 10,
                      value:
                        String(funcs) != "" ? String(funcs) : "Тут ничего нет",
                    }),
                    uploadChars({
                      id: 0,
                      product_id: prod_id,
                      characteristic_id: 11,
                      value:
                        String(techs) != "" ? String(techs) : "Тут ничего нет",
                    }),
                  ]);

                  setIndicator(
                    <SpinnerCustom
                      text={"Загружаю аудио, даже если его нет я попробую"}
                    />
                  );
                  await uploadAudio(prod_id);
                }

                await pageStore.getProducts();
                setProductId(null);
                setIndicator(null);
                resetForm(); // Сброс формы после отправки
                onClose(); // Закрытие модалки
              }}
              enableReinitialize
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit} id="formik-form">
                  <VStack spacing={4} position={"relative"}>
                    <FormLabel alignSelf={"flex-start"}>
                      Главное изображение
                    </FormLabel>
                    {previewUrl && <Image src={previewUrl} />}

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {indicator}
                    <FormLabel alignSelf={"flex-start"}>
                      Дополнительные изображения
                    </FormLabel>
                    <Text fontSize={12}>
                      Если это картинка цвета то следует заменить нулл на
                      конкретный цвет, если нет - оставить нулл
                    </Text>
                    <HStack width={"100%"} overflowX={"scroll"}>
                      {additionalFiles.map((elem, index, array) => (
                        <VStack>
                          {" "}
                          <Image
                            src={URL.createObjectURL(elem?.url)}
                            boxSize="150px"
                            objectFit="cover"
                          />
                          <Box width="150px" textAlign="center">
                            <Input
                              value={elem.color}
                              onChange={(e) => {
                                let copy_array = Array.from(array);
                                copy_array[index].color = e.target.value;
                                setAdditionalFiles(copy_array);
                              }}
                            />
                          </Box>
                        </VStack>
                      ))}
                    </HStack>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChangeAdd}
                      multiple
                    />
                    {/* Имя */}
                    <FormControl isInvalid={errors.name && touched.name}>
                      <FormLabel>Имя товара</FormLabel>
                      <Field as={Input} name="name" placeholder="Введите имя" />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>

                    {/* Категория */}
                    <FormControl
                      isInvalid={errors.category_id && touched.category_id}
                    >
                      <FormLabel>Категория</FormLabel>
                      <Field
                        as={Input}
                        name="category_id"
                        placeholder="Введите ID категории"
                        type="number"
                      />
                      <FormErrorMessage>{errors.category_id}</FormErrorMessage>
                    </FormControl>

                    {/* Цена */}
                    <FormControl isInvalid={errors.price && touched.price}>
                      <FormLabel>Цена (₽)</FormLabel>
                      <Field
                        as={Input}
                        name="price"
                        placeholder="Введите цену"
                        type="number"
                      />
                      <FormErrorMessage>{errors.price}</FormErrorMessage>
                    </FormControl>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Цена в рублях евро и бел.рублях</FormLabel>
                      <Input
                        placeholder="Цена в рублях евро и бел.рублях: ru eu br"
                        onChange={(event) => setCurInput(event.target.value)}
                        onBlur={async () => {
                          await createCurrency();
                        }}
                        value={curInput}
                      ></Input>
                      <Text color="rgb(229, 62, 62)">
                        Нужно ввести цены в валюте в формате ru eu br
                      </Text>
                    </VStack>

                    {/* Статус */}
                    <FormControl
                      isInvalid={errors.is_active && touched.is_active}
                    >
                      <FormLabel>
                        Статус (опубликовано или нет: Y или N)
                      </FormLabel>
                      <Field
                        as={Input}
                        name="is_active"
                        placeholder="Y (опубликован) или N (скрыт)"
                      />
                      <FormErrorMessage>{errors.is_active}</FormErrorMessage>
                    </FormControl>

                    {/* Позиция */}
                    <FormControl
                      isInvalid={errors.position && touched.position}
                    >
                      <FormLabel>Позиция</FormLabel>
                      <Field
                        as={Input}
                        name="position"
                        placeholder="Позиция в категории"
                        type="number"
                      />
                      <FormErrorMessage>{errors.position}</FormErrorMessage>
                    </FormControl>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Описание</FormLabel>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      >
                        Описание товара если нужно
                      </Textarea>
                    </VStack>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Автономность</FormLabel>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={autonomy}
                        onChange={(e) => setAutonomy(e.target.value)}
                      />
                    </VStack>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Качество звука</FormLabel>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={sound}
                        onChange={(e) => setSound(e.target.value)}
                      />
                    </VStack>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Качество микрофона</FormLabel>
                      <Input
                        type="number"
                        min={1}
                        max={10}
                        value={micro}
                        onChange={(e) => setMicro(e.target.value)}
                      />
                    </VStack>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Комплектация</FormLabel>
                      <Textarea
                        value={complect}
                        onChange={(e) => setComplect(e.target.value)}
                      >
                        если нужно
                      </Textarea>
                    </VStack>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Функционал</FormLabel>
                      <Textarea
                        value={funcs}
                        onChange={(e) => setFuncs(e.target.value)}
                      >
                        если нужно
                      </Textarea>
                    </VStack>
                    <VStack width={"100%"} align={"flex-start"}>
                      <FormLabel>Технические характеристики</FormLabel>
                      <Textarea
                        value={techs}
                        onChange={(e) => setTechs(e.target.value)}
                      >
                        если нужно
                      </Textarea>
                    </VStack>
                    <FormLabel alignSelf={"flex-start"}>
                      Тест микрофона(если нужен)
                    </FormLabel>
                    <Input
                      type="file"
                      accept="audio/mp3"
                      onChange={handleFileChangeAudio}
                    />
                  </VStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={4}>
              <Button
                type="submit"
                form="formik-form"
                bgColor={"rgb(73, 69, 255)"}
                color={"white"}
              >
                Создать
              </Button>
              <Button onClick={onClose} colorScheme="red">
                Отмена
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateProduct;
