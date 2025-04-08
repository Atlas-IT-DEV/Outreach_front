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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const ModalCreateStory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Валидация с Yup
  const validationSchema = Yup.object().shape({
    ProductID: Yup.string().required(
      "Айди продукта необходим (то к чему мы привязываем историю)"
    ),
    Link: Yup.string().required("Необходима ссылка"),
  });

  // Обработчик формы
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("ProductID", values.ProductID);
    formData.append("Name", values.Name);
    formData.append("Link", values.Link);
    formData.append("image", values.image);

    try {
      const response = await fetch("https://apbstore.ru:8008/storis/", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Story created successfully:", data);
      onClose(); // Закрываем модалку при успехе
    } catch (error) {
      console.error("Failed to create story:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button bgColor={"rgb(73, 69, 255)"} onClick={onOpen}>
        Добавить сторис
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(33, 33, 52)" color="white">
          <ModalHeader>Добавить сторис</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                ProductID: "",
                Name: null,
                Link: "",
                image: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, isSubmitting }) => (
                <Form>
                  <FormControl mb={4}>
                    <FormLabel>
                      ID продукта(можно посмотреть в товарах)
                    </FormLabel>
                    <Field
                      name="ProductID"
                      as={Input}
                      placeholder="Введите ProductID"
                    />
                    <FormErrorMessage name="ProductID" component="div" />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>
                      Ссылка (куда ведет пользователя при нажатии на историю)
                    </FormLabel>
                    <Field name="Link" as={Input} placeholder="Введите Link" />
                    <FormErrorMessage name="Link" component="div" />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel>Картинка сториса</FormLabel>
                    <Input
                      type="file"
                      onChange={(event) =>
                        setFieldValue("image", event.currentTarget.files[0])
                      }
                    />
                    <FormErrorMessage name="image" component="div" />
                  </FormControl>

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

export default ModalCreateStory;
