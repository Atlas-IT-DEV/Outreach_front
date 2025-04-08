import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  HStack,
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useStores } from "../store/store_context";

const ModalCreateComment = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { pageStore } = useStores();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");

  // Валидация с Yup
  const validationSchema = Yup.object().shape({
    product_id: Yup.number()
      .required("Айди продукта обязательно")
      .typeError("ID продукта должно быть числом"),
    user_id: Yup.number()
      .required("Айди пользователя обязательно")
      .typeError("ID пользователя должно быть числом"),
    comment: Yup.string().required("Комментарий обязателен"),
  });

  const createUser = async () => {
    const response = await fetch("https://apbstore.ru:8008/users/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        name: name,
        telegram_id: Date.now() % 100000,
      }),
    });
    const result = await response.json();
    setUserId(result.id);
  };

  // Обработчик формы
  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = {
      id: 0,
      product_id: 19,
      user_id: values.user_id,
      comment: values.comment,
      created_at: values.created_at, // Дата в формате YYYY-MM-DDTHH:mm:ss
    };

    try {
      const response = await fetch(
        "https://apbstore.ru:8008/product_comments/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      files.length != 0 && (await uploadImage(data?.id));
      console.log("Comment created successfully:", data);
      pageStore.getComments();
      onClose(); // Закрываем модалку при успехе
    } catch (error) {
      console.error("Failed to create comment:", error);
    } finally {
      setSubmitting(false);
    }
  };
  //image upload func
  const uploadImage = async (comment_id) => {
    const url = "https://apbstore.ru:8008/image_upload/comment";

    // Создаем объект FormData
    const formData = new FormData();
    files?.map((elem) => formData.append("files", elem));
    formData.append("comment_id", comment_id);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      // Обрабатываем ответ
      if (response.ok) {
        const data = await response.json();
        console.log("Успешный ответ:", data);
      } else {
        console.error("Ошибка запроса:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };
  const [files, setFiles] = useState([]);

  const handleFileChangeAdd = (e) => {
    setFiles(Array.from(e.target.files));
  };

  return (
    <>
      <Button bgColor={"rgb(73, 69, 255)"} onClick={onOpen}>
        Добавить комментарий
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(33, 33, 52)" color="white">
          <ModalHeader>Добавить комментарий</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                product_id: 19,
                user_id: userId,
                comment: "",
                created_at: new Date().toISOString().slice(0, 16), // Устанавливаем текущую дату и время по умолчанию
              }}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormLabel>Имя пользователя</FormLabel>
                  <Input
                    placeholder="Введите имя пользователя"
                    marginBottom={"15px"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => createUser()}
                  ></Input>

                  <FormControl mb={4}>
                    <FormLabel>Комментарий</FormLabel>
                    <Field
                      name="comment"
                      as={Textarea}
                      placeholder="Введите комментарий"
                    />
                    <FormErrorMessage name="comment" component="div" />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Дата создания</FormLabel>
                    <Field
                      name="created_at"
                      as={Input}
                      type="datetime-local"
                      placeholder="Выберите дату"
                    />
                    <FormErrorMessage name="created_at" component="div" />
                  </FormControl>
                  {files.length != 0 && (
                    <HStack width={"100%"} overflowX={"scroll"}>
                      {files?.map((elem, index) => (
                        <Image
                          key={index}
                          src={URL.createObjectURL(elem)}
                        ></Image>
                      ))}
                    </HStack>
                  )}
                  <FormLabel alignSelf={"flex-start"}>
                    Картинки комментария
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChangeAdd}
                    multiple
                    max={3}
                  />

                  <ModalFooter>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      mr={3}
                      isLoading={isSubmitting}
                    >
                      Сохранить
                    </Button>
                    <Button onClick={onClose}>Отмена</Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateComment;
