import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Searcher from "../components/searcher";
import TableBase from "../components/base_page/table_base";
import ModalBaseFIlter from "../components/base_page/modal_base_filter";

const BasePage = () => {
  const [selected, setSelected] = useState([1, 0, 0, 0, 0]);

  return (
    <VStack
      width={"100%"}
      minHeight={"100vh"}
      height={"auto"}
      overflow={"hidden scroll"}
      align={"flex-start"}
      marginLeft={"280px"}
      padding={"40px"}
    >
      <HStack width={"100%"}>
        <Searcher />
        <ModalBaseFIlter />
      </HStack>

      <HStack
        width={"100%"}
        justify={"flex-end"}
        gap={"10px"}
        marginTop={"20px"}
      >
        <Button
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          border={"1px solid #4682B4"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "#4682B4", color: "white" }}
          flexShrink={0}
        >
          <Text>Импортировать базу</Text>
        </Button>
        <Button
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          border={"1px solid #4682B4"}
          bg={"white"}
          color={"black"}
          _hover={{ bg: "#4682B4", color: "white" }}
          flexShrink={0}
        >
          <Text>Экспортировать базу</Text>
        </Button>
      </HStack>
      <Stack width={"100%"} marginTop={"20px"}>
        <TableBase />
      </Stack>
    </VStack>
  );
};

export default BasePage;
