import { Button, Text } from "@chakra-ui/react";
import useWindowDimensions from "../../windowDimensions";

const ModalNewScript = () => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Button
        border={"1px solid #4682B4"}
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
      >
        <Text fontSize={width >= 1000 ? "16px" : "14px"}>Новый скрипт</Text>
      </Button>
    </>
  );
};

export default ModalNewScript;
