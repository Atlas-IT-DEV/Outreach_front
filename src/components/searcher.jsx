import { Input, Text, Tooltip, VStack } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";

const Searcher = observer(
  ({ array, options = {}, placeholder = "Поиск", search_by = "Поиск" }) => {
    const { pageStore } = useStores();

    console.log("search", pageStore.searchValue);

    const searchProduct = () => {
      let copyArray;
      if (pageStore.searchValue != "") {
        copyArray = Array.from(array);
        const fuse = new Fuse(copyArray, options);
        const result = fuse.search(pageStore.searchValue);
        const similar = result.map((res) => res.item);

        pageStore.updateSearchElement(similar);
      } else {
        pageStore.updateSearchElement([]);
      }
    };

    useEffect(() => {
      searchProduct();
    }, [pageStore.searchValue, options]);

    useEffect(() => {
      pageStore.updateSearchValue("");
    }, []);
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
        <Tooltip
          label={"Подсказка: Вы можете делать поиск по любым полям"}
          bg={"#4682B4"}
          color={"white"}
          borderRadius={"10px"}
          placement="bottom-start"
        >
          <Input
            value={pageStore.searchValue}
            onChange={(e) => pageStore.updateSearchValue(e.target.value)}
            width={"100%"}
            border={"2px solid #4682B4"}
            borderRadius={"0px"}
            _hover={{ border: "2px solid #4682B4" }}
            placeholder={`${placeholder}`}
          />
        </Tooltip>
      </VStack>
    );
  }
);

export default Searcher;
