import {
  HStack,
  ModalBody,
  VStack,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const CommentsPage = observer(() => {
  const { pageStore, mainStore } = useStores();
  useEffect(() => {
    console.log("asdasdasdasdasd");
  }, []);
  return (
    <VStack
      width={"100%"}
      marginLeft={mainStore.isOpen ? "280px" : "0px"}
      p={["10px", "13px", "40px"]}
    >
      <HStack width={"100%"} justify={"flex-start"} gap={"20px"}></HStack>
      <VStack
        width={mainStore.isOpen ? "80%" : "100%"}
        alignSelf={"center"}
        marginTop={"30px"}
      >
        <VStack
          width={"100%"}
          boxShadow={"0px 0px 15px 4px rgba(0,0,0,0.08);"}
          backgroundColor={"white"}
          padding={["10px 10px", "20px 40px"]}
        >
          <Text
            fontSize={["20px", "28px"]}
            fontWeight={"500"}
            color={"black"}
            onClick={() => {
              console.log(pageStore.user_data);
            }}
            alignSelf={"flex-start"}
          >
            Данные профиля
          </Text>
          <HStack width={"100%"} align={"flex-start"}>
            <VStack width={"100%"} align={"flex-start"}>
              <Text
                color={"#4682B4"}
                fontWeight={400}
                fontSize={["16px", "20px"]}
              >
                {pageStore.user_data.first_name} {pageStore.user_data.last_name}
              </Text>
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  ID
                </Text>
                <Text fontSize={["16px", "20px"]}>
                  {pageStore.user_data.id}
                </Text>
              </HStack>
              <Divider />
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  EMAIL
                </Text>
                <Text fontSize={["16px", "20px"]}>
                  {pageStore.user_data.email}
                </Text>
              </HStack>
              <Divider />
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  ИМЯ
                </Text>
                <Text fontSize={["16px", "20px"]}>
                  {pageStore.user_data.first_name}
                </Text>
              </HStack>
              <Divider />
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  ФАМИЛИЯ
                </Text>
                <Text fontSize={["16px", "20px"]}>
                  {pageStore.user_data.last_name}
                </Text>
              </HStack>
              <Divider />
              <HStack width={"100%"} justify={"space-between"}>
                <Text
                  fontSize={["16px", "20px"]}
                  fontWeight={400}
                  color={"#4682B4"}
                >
                  РОЛЬ
                </Text>
                <Text fontSize={["16px", "20px"]}>
                  {pageStore.user_data.role == "U"
                    ? "пользователь"
                    : pageStore.user_data.role == "A"
                    ? "главный администратор"
                    : "создатель курсов"}
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <VStack
          width={"100%"}
          boxShadow={"0px 0px 15px 4px rgba(0,0,0,0.08);"}
          backgroundColor={"white"}
          padding={["10px 10px", "20px 40px"]}
          marginTop={"20px"}
        >
          <HStack width={"100%"} align={"flex-start"}>
            <VStack width={"80%"} align={"flex-start"}>
              <Text
                color={"#4682B4"}
                fontWeight={400}
                fontSize={["16px", "20px"]}
              >
                Важно знать!
              </Text>
              <Text fontSize={["16px", "20px"]}>
                Если вы заметили ошибку в данных профиля и хотите изменить
                данные, обратитесь к администратору курса
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
});

export default CommentsPage;
