import { Button, Text } from "@chakra-ui/react";

const ModalNewScript = () => {
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
        <Text>Новый скрипт</Text>
      </Button>
    </>
  );
};

export default ModalNewScript;
