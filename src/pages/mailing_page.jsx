import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

import Journal from "../components/mailing_page/journal";
import Patterns from "../components/mailing_page/patterns";
import Report from "../components/mailing_page/report";

const MailingPage = () => {
  const [selected, setSelected] = useState([1, 0, 0]);

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
      <HStack width={"100%"} gap={"10px"} justify={"space-between"}>
        <Button
          width={"100%"}
          border={"1px solid #4682B4"}
          boxShadow={"-2px 2px 0 0 #4682B4"}
          borderRadius={"0px"}
          bg={selected[0] == 1 ? "#4682B4" : "white"}
          color={selected[0] == 1 ? "white" : "black"}
          onClick={() => setSelected([1, 0, 0])}
          _hover={{ bg: "#4682B4", color: "white" }}
        >
          <Text>Журнал</Text>
        </Button>
        <Button
          width={"100%"}
          border={"1px solid #4682B4"}
          borderRadius={"0px"}
          boxShadow={"-2px 2px 0 0 #4682B4"}
          bg={selected[1] == 1 ? "#4682B4" : "white"}
          color={selected[1] == 1 ? "white" : "black"}
          onClick={() => setSelected([0, 1, 0])}
          _hover={{ bg: "#4682B4", color: "white" }}
        >
          <Text>Шаблоны</Text>
        </Button>
        <Button
          width={"100%"}
          border={"1px solid #4682B4"}
          borderRadius={"0px"}
          boxShadow={"-2px 2px 0 0 #4682B4"}
          bg={selected[2] == 1 ? "#4682B4" : "white"}
          color={selected[2] == 1 ? "white" : "black"}
          onClick={() => setSelected([0, 0, 1])}
          _hover={{ bg: "#4682B4", color: "white" }}
        >
          <Text>Отчетность</Text>
        </Button>
      </HStack>
      {selected[0] == 1 ? (
        <Journal />
      ) : selected[1] == 1 ? (
        <Patterns />
      ) : (
        <Report />
      )}
    </VStack>
  );
};

export default MailingPage;
