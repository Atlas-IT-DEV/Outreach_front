import { Button, Text } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";

const ModalBaseFIlter = () => {
  return (
    <>
      <Button
        flexShrink={0}
        border={"2px solid #4682B4"}
        borderRadius={"0px"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
        gap={"5px"}
      >
        <FiFilter />
        <Text>Фильтры</Text>
      </Button>
    </>
  );
};

export default ModalBaseFIlter;
