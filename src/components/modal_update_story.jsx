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
  Image,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { VscEdit } from "react-icons/vsc";
import { useEffect, useState } from "react";

const ModalUpdateStory = ({ storisId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Валидация с Yup
  const validationSchema = Yup.object().shape({
    ProductID: Yup.string().required("Айди продукта обязательно"),
    Link: Yup.string().required("Необходима ссылка"),
  });
  const getStory = async () => {
    const response = await fetch(
      `https://apbstore.ru:8008/storis/storis_id/${storisId}`,
      { method: "GET", headers: { accept: "application/json" } }
    );
    const result = await response.json();
    setStory(result);
  };
  const [story, setStory] = useState({});
  const [fileAdded, setFileAdded] = useState(false);

  // Обработчик формы
  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("StorisID", storisId); // ID сториса для обновления
    formData.append("ProductID", values.ProductID);
    formData.append("Name", values.Name);
    formData.append("Link", values.Link);
    formData.append("image", values.image);

    try {
      const response = await fetch(
        `https://apbstore.ru:8008/storis/${storisId}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Story updated successfully:", data);
      onClose(); // Закрываем модалку при успехе
    } catch (error) {
      console.error("Failed to update story:", error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    isOpen && getStory();
  }, [isOpen]);

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
          <ModalHeader>Обновить сторис</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                ProductID: story?.product_id,
                Name: story?.name,
                Link: story?.link,
                image: story?.image_url,
              }}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, values, isSubmitting }) => (
                <Form>
                  <FormControl mb={4}>
                    <FormLabel>
                      ID продукта (можно посмотреть в товарах)
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

                  {story?.image_url && (
                    <Image
                      src={
                        fileAdded
                          ? URL.createObjectURL(values.image)
                          : "https://apbstore.ru:8008/public/" +
                            story?.image_url
                      }
                    />
                  )}

                  <FormControl mb={4}>
                    <FormLabel>Картинка сториса</FormLabel>
                    <Input
                      type="file"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                        setFileAdded(true);
                      }}
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
                      Обновить
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

export default ModalUpdateStory;
