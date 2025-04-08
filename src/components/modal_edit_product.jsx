import React, { useEffect } from "react";
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
  color,
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
import { VscEdit } from "react-icons/vsc";
import DraggablePhotoGallery from "./draggable_photo_editor";
import DraggableStories from "./draggable_storys";

const ModalEditProduct = ({ product_id }) => {
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
  const [product, setProduct] = useState({});
  const [micro_test, setMicroTest] = useState(null);
  const [files_added, setFilesAdded] = useState(false);
  const [all_chars, setAllChars] = useState([]);
  const [product_storys, setProductStorys] = useState([]);

  const getStorys = async () => {
    const response = await fetch(
      `https://apbstore.ru:8008/storis/product_id/${product_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );

    const result = await response.json();
    setProductStorys(result);
  };

  const getAllChars = async () => {
    const response = await fetch(
      "https://apbstore.ru:8008/product_characteristics/",
      { method: "GET", headers: { accept: "apllication/json" } }
    );
    const result = await response.json();
    setAllChars(result.filter((elem) => elem.product_id == product_id));
  };
  const getProduct = async () => {
    const response = await fetch(
      `https://apbstore.ru:8008/products/product_id/${product_id}?dirs=true`,
      { method: "GET", headers: { accept: "application/json" } }
    );
    if (response.ok) {
      const result = await response.json();
      setProduct(result);
    } else {
      toast({
        title: "Не получилось подгрузить товар, возможно это ошибка.",
        description:
          "Вероятно, на сервере какая-то ошибка либо черная магия бэкендеров",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }
  };
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
  const updateProduct = async (values) => {
    const response = await fetch(
      `https://apbstore.ru:8008/products/${product_id}`,
      {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const result = await response.json();
    console.log(result);
    setProductId(result.id);
    return result.id;
  };
  const uploadImageMain = async () => {
    if (!file || !product_id) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите файл и укажите ID продукта",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if (product?.urls?.length == 0) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("product_id", product_id);
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
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("product_id", product_id);
      formData.append("color", "");
      console.log(productId);
      const response = await fetch(
        "https://apbstore.ru:8008/image_update/product/main",
        {
          method: "PUT",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );
      return response.ok;
    }
  };
  const getImageIds = async () => {
    const response_images = await fetch(
      `https://apbstore.ru:8008/product_images/product_id/${product_id}`,
      { method: "GET", headers: { accept: "application.json" } }
    );
    const result_images = await response_images.json();
    const images_ids = result_images
      .filter((elem) => elem.image_type != "main")
      .map((elem) => elem.id);
    return images_ids;
  };
  const deleteImageProduct = async (product_image_id) => {
    const response = await fetch(
      `https://apbstore.ru:8008/product_images/${product_image_id}`,
      { method: "DELETE", headers: { accept: "application/json" } }
    );
  };
  const uploadImageAdditionals = async (productId) => {
    if (!additionalFiles || !productId) {
      return;
    }
    const image_ids = await getImageIds();
    image_ids.map(async (elem) => {
      await deleteImageProduct(elem);
    });
    let add_copy = Array.from(additionalFiles);
    add_copy = await Promise.all(
      add_copy.map(async (elem) => {
        return {
          url:
            typeof elem.url == "string"
              ? await urlToFile(
                  elem.url,
                  `${crypto.randomUUID()}.${
                    elem.url.split(".")[elem.url.split(".").length - 1]
                  }`,
                  "image/jpeg"
                )
              : elem.url,
          color: elem.color,
        };
      })
    );
    console.log(add_copy);
    const formData = new FormData();
    add_copy.map(async (elem) => {
      formData.append("files", elem.url);
    });
    formData.append("product_id", productId);
    formData.append(
      "colors",
      add_copy.reduce((acc, elem) => acc + `${elem.color},`, "")
    );

    console.log(add_copy.reduce((acc, elem) => acc + `${elem.color},`, ""));

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
  const uploadAudio = async (productId, product_audio_id) => {
    if (!audio || !productId) {
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
    formData.append("ProductAudioId", product_audio_id);
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
    },
    pr_char_id
  ) => {
    const response = await fetch(
      `https://apbstore.ru:8008/product_characteristics/${pr_char_id}`,
      {
        method: "PUT",
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
    setFilesAdded(true);
    setAdditionalFiles(
      Array.from(e.target.files).map((elem) => {
        return { url: elem, color: "null" };
      })
    );
    console.log(
      "DICK",
      typeof e.target.files[0],
      Array.from(e.target.files).map((elem) => {
        return { url: elem, color: "null" };
      })
    );
  };
  const handleFileChangeAudio = (e) => {
    setAudio(e.target.files[0]);
    setMicroTest(URL.createObjectURL(e.target.files[0]));
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
  useEffect(() => {
    isOpen && getProduct();
    isOpen && getStorys();
    isOpen && getAllChars();
  }, [isOpen]);

  useEffect(() => {
    setCurInput(
      `${product?.currency?.ru} ${product?.currency?.eu} ${product?.currency?.br}`
    );
    setDescription(
      product?.characteristics?.find((elem) => elem.id == 6)?.value
    );
    setAutonomy(product?.characteristics?.find((elem) => elem.id == 4)?.value);
    setSound(product?.characteristics?.find((elem) => elem.id == 7)?.value);
    setMicro(product?.characteristics?.find((elem) => elem.id == 8)?.value);
    setComplect(product?.characteristics?.find((elem) => elem.id == 9)?.value);
    setFuncs(product?.characteristics?.find((elem) => elem.id == 10)?.value);
    setTechs(product?.characteristics?.find((elem) => elem.id == 11)?.value);
    setPreviewUrl(product?.urls?.[0]?.url);
    setMicroTest(product?.audio_files?.[0]?.our_url);
    setAdditionalFiles(
      product?.urls?.splice(1, product?.urls?.length - 1)?.map((elem) => {
        return {
          url: elem?.url,
          color: elem.Color == "" || elem.Color == null ? "null" : elem.Color,
        };
      })
    );
    console.log(
      "HUI",
      product?.urls?.splice(1, product?.urls?.length - 1)?.map((elem) => {
        return {
          url: elem?.url,
          color: elem.Color == "" || elem.Color == null ? "null" : elem.Color,
        };
      })
    );
  }, [product]);

  async function urlToFile(url, filename, mimeType) {
    // Шаг 1: Получаем содержимое файла по URL
    const response = await fetch(url);
    const blob = await response.blob();

    // Шаг 2: Создаём объект File из Blob
    const file = new File([blob], filename, { type: mimeType });
    return file;
  }

  return (
    <>
      <VscEdit
        size={18}
        color="rgb(73, 69, 255)"
        cursor={"pointer"}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(33, 33, 52)" color="white">
          <ModalHeader>Обновление товара</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                id: 0,
                name: product?.name,
                promotion_id: product?.promotion?.id,
                currency_id: createdCurId,
                company_id: product?.company?.id,
                category_id: product?.category_id,
                price: product?.price,
                is_active: product?.is_active,
                position: product?.position,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                values = { ...values, currency_id: createdCurId };
                console.log(values); // Обработка данных
                setIndicator(<SpinnerCustom text={"Обновляю товар"} />);

                await updateProduct(values);

                if (file) {
                  setIndicator(
                    <SpinnerCustom text={"Загружаю главное изображение"} />
                  );
                  await uploadImageMain(product_id);
                }
                if (files_added) {
                  setIndicator(
                    <SpinnerCustom text={"Загружаю цвета и изображения"} />
                  );
                  await uploadImageAdditionals(product_id);
                }

                setIndicator(
                  <SpinnerCustom text={"Загружаю доп информацию"} />
                );
                Promise.all([
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 4,
                      value: String(autonomy),
                    },
                    all_chars.find((elem) => elem.characteristic_id == 4).id
                  ),
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 6,
                      value:
                        String(description) != ""
                          ? String(description)
                          : "Тут ничего нет",
                    },
                    all_chars.find((elem) => elem.characteristic_id == 6).id
                  ),
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 7,
                      value: String(sound),
                    },
                    all_chars.find((elem) => elem.characteristic_id == 7).id
                  ),
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 8,
                      value: String(micro),
                    },
                    all_chars.find((elem) => elem.characteristic_id == 8).id
                  ),
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 9,
                      value:
                        String(complect) != ""
                          ? String(complect)
                          : "Тут ничего нет",
                    },
                    all_chars.find((elem) => elem.characteristic_id == 9).id
                  ),
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 10,
                      value:
                        String(funcs) != "" ? String(funcs) : "Тут ничего нет",
                    },
                    all_chars.find((elem) => elem.characteristic_id == 10).id
                  ),
                  uploadChars(
                    {
                      id: 0,
                      product_id: product_id,
                      characteristic_id: 11,
                      value:
                        String(techs) != "" ? String(techs) : "Тут ничего нет",
                    },
                    all_chars.find((elem) => elem.characteristic_id == 11).id
                  ),
                ]);
                if (audio) {
                  setIndicator(
                    <SpinnerCustom
                      text={"Загружаю аудио, даже если его нет я попробую"}
                    />
                  );
                  await uploadAudio(product_id, product?.audio_files?.[0]?.id);
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
                    <DraggablePhotoGallery
                      photos={additionalFiles}
                      setPhotos={setAdditionalFiles}
                      setFilesAdded={setFilesAdded}
                      files_added={files_added}
                    />

                    {/*                     <HStack width={"100%"} overflowX={"scroll"}>
                      {additionalFiles?.map((elem, index, array) => (
                        <VStack>
                          {" "}
                          <Image
                            src={
                              typeof elem?.url == "object"
                                ? elem?.url
                                : elem?.url
                            }
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
                    </HStack> */}
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
                    {micro_test && (
                      <audio
                        src={micro_test}
                        controls
                        style={{ width: "100%" }}
                      />
                    )}

                    <Input
                      type="file"
                      accept="audio/mp3"
                      onChange={handleFileChangeAudio}
                    />
                    <FormLabel alignSelf={"flex-start"}>
                      Сторисы товара
                    </FormLabel>
                    <Text fontSize={12}>
                      Не забудьте нажать кнопку подтвердить после внесения
                      изменений в набор сторисов товара
                    </Text>
                    <DraggableStories
                      stories={product_storys.map((elem) => {
                        return {
                          productId: product_id,
                          link: elem?.link,
                          image:
                            "https://apbstore.ru:8008/public/" +
                            elem?.image_url,
                        };
                      })}
                      stories_ids={product_storys.map((elem) => elem?.id)}
                      product_id={product_id}
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

export default ModalEditProduct;
