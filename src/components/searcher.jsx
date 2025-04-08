import { Input } from "@chakra-ui/react";

const Searcher = () => {
  return (
    <Input
      width={"100%"}
      border={"2px solid #4682B4"}
      borderRadius={"0px"}
      _hover={{ border: "2px solid #4682B4" }}
      placeholder="Поиск"
    />
  );
};

export default Searcher;
