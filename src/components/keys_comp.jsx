import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Spinner, Button, useToast } from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import CreateKeyModal from "./create_key_modal";
import ModalDeleteProduct from "./modal_delete_product";
import ModalDeleteKey from "./modal_delete_key";

const CourseKeys = observer(() => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { pageStore } = useStores();
  const toast = useToast(); // Используется для уведомлений
  const fetchKeys = async () => {
    try {
      const response = await fetch(
        "https://me-course.com:8069/api/course/key/",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${pageStore.acc_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setKeys(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Ключ скопирован!",
          description: "Текст ключа успешно скопирован в буфер обмена.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Ошибка",
          description: `Не удалось скопировать ключ: ${err}`,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  if (loading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
        <Text>Загрузка...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" color="red.500">
        <Text>Ошибка: {error}</Text>
      </Box>
    );
  }

  return (
    <VStack alignSelf={"flex-start"} align={"flex-start"} width={"100%"}>
      <Text
        fontSize={["20px", "28px"]}
        fontWeight={"500"}
        color={"black"}
        mb={4}
      >
        Ключи доступа
      </Text>
      <CreateKeyModal fetchKeys={fetchKeys} />
      <VStack spacing={3} width={"100%"}>
        {keys.map((key) => (
          <VStack
            key={key.id}
            align={"flex-start"}
            boxShadow={"0px 0px 15px 4px rgba(0,0,0,0.08);"}
            backgroundColor={"white"}
            padding={["10px 10px", "20px 40px"]}
            width={"100%"}
          >
            <Text
              fontSize={["14px", "20px"]}
              fontWeight={500}
              color={"#4682B4"}
            >
              Ссылка ключ
            </Text>
            <Text maxWidth={"80vw"} fontSize={["14px", "20px"]}>
              {"https://me-course.com/" + key.text_key}
            </Text>
            <Text fontSize={["14px", "20px"]}>
              <strong>course_id:</strong> {key.course_id}
            </Text>
            <Text fontSize={["14px", "20px"]}>
              <strong>creator_id:</strong> {key.creator_id}
            </Text>
            <Button
              mt={2}
              backgroundColor={"#4682B4"}
              color={"white"}
              size="sm"
              onClick={() =>
                copyToClipboard("https://me-course.com/" + key.text_key)
              }
            >
              Копировать ключ
            </Button>
            <ModalDeleteKey
              product_id={key.id}
              url={"https://me-course.com:8069/api/course/key/"}
              fetchKeys={fetchKeys}
            />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
});

export default CourseKeys;
