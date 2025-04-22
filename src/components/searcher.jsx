import { Input, Text, VStack } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useStores } from "../store/store_context";

const Searcher = ({
  array,
  options = {},
  placeholder = "Поиск",
  search_by = "Поиск",
}) => {
  const { pageStore } = useStores();

  const [searchValue, setSearchValue] = useState("");

  const searchProduct = () => {
    let copyArray;
    if (searchValue != "") {
      copyArray = Array.from(array);
      const fuse = new Fuse(copyArray, options);
      const result = fuse.search(searchValue);
      const similar = result.map((res) => res.item);

      pageStore.updateSearchElement(similar);
    } else {
      pageStore.updateSearchElement([]);
    }
  };

  useEffect(() => {
    searchProduct();
    console.log("searcher", pageStore.search_elements);
  }, [searchValue]);
  return (
    <VStack
      width={"100%"}
      align={"flex-start"}
      justify={"flex-start"}
      marginTop={"10px"}
    >
      <Text fontWeight={"600"} color={"black"}>
        {search_by}
      </Text>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        width={"100%"}
        border={"2px solid #4682B4"}
        borderRadius={"0px"}
        _hover={{ border: "2px solid #4682B4" }}
        placeholder={`${placeholder}`}
      />
    </VStack>
  );
};

export default Searcher;
