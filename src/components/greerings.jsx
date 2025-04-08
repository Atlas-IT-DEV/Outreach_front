import { HStack, VStack, Text, Image } from "@chakra-ui/react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import main from "./../images/main.webp";
import useWindowDimensions from "../windowDimensions";

const Greetings = observer(() => {
  const { width, height } = useWindowDimensions();
  const { pageStore } = useStores();
  function getGreeting() {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return "Доброе утро";
    } else if (hour >= 12 && hour < 18) {
      return "Добрый день";
    } else if (hour >= 18 && hour < 24) {
      return "Добрый вечер";
    } else {
      return "Доброй ночи";
    }
  }
  return (
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
        {getGreeting()}, {pageStore.user_data.first_name}
      </Text>
      {width >= 1100 ? (
        <HStack width={"100%"} align={"flex-start"}>
          <VStack width={"50%"} align={"flex-start"}>
            <Text
              color={"#4682B4"}
              fontWeight={500}
              fontSize={["16px", "20px"]}
            >
              Lorem Ipsum
            </Text>
            <Text>
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem
              ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum
              dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem
              ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum
              dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem
              ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum
              dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
            </Text>
          </VStack>
          <Image src={main} width={"50%"} maxH={"280px"} objectFit={"cover"} />
        </HStack>
      ) : (
        <VStack width={"100%"} align={"flex-start"}>
          <VStack width={"100%"} align={"flex-start"}>
            <Text
              color={"#4682B4"}
              fontWeight={500}
              fontSize={["16px", "20px"]}
            >
              Lorem Ipsum
            </Text>
            <Text fontSize={["16px", "20px"]}>
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem
              ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum
              dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem
              ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum
              dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
              Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem
              ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum
              dolor. Lorem ipsum dolor. Lorem ipsum dolor. Lorem ipsum dolor.
            </Text>
          </VStack>
          <Image src={main} width={"100%"} maxH={"280px"} objectFit={"cover"} />
        </VStack>
      )}
    </VStack>
  );
});

export default Greetings;
