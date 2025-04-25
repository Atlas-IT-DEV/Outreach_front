import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../store/store_context";
import { useState } from "react";

const ModalSelectBase = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pageStore } = useStores();

  return (
    <>
      <Button
        onClick={onOpen}
        boxShadow={"-2px 2px 0 0 #4682B4"}
        borderRadius={"0px"}
        border={"2px solid #4682B4"}
        bg={"white"}
        color={"black"}
        _hover={{ bg: "#4682B4", color: "white" }}
        flexShrink={0}
      >
        <Text>Выбрать базу</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={"20px"}>
          <ModalCloseButton />
          <Text
            color={"black"}
            fontWeight={"600"}
            width={"100%"}
            textAlign={"center"}
          >
            Выберите базу
          </Text>

          <RadioGroup
            value={pageStore.selected_name_base}
            onChange={(e) => pageStore.updateSelectedNameBase(e)}
          >
            <VStack
              width={"100%"}
              align={"flex-start"}
              justify={"flex-start"}
              marginTop={"20px"}
            >
              <Text fontWeight={"600"} color={"black"}>
                Все базы
              </Text>
              {pageStore.bases.length > 0
                ? pageStore.bases.map((item, index) => (
                    <Radio key={index} value={item}>
                      {index + 1}. {item}
                    </Radio>
                  ))
                : null}
            </VStack>
          </RadioGroup>
          <HStack justify={"flex-end"} width={"100%"} marginTop={"20px"}>
            <Button
              onClick={onClose}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"2px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
              flexShrink={0}
            >
              Отменить
            </Button>
            <Button
              onClick={async () => {
                pageStore.updateCurrentPage(0);
                await pageStore.getBaseByName(
                  pageStore.selected_name_base,
                  pageStore.selected_department,
                  pageStore.current_page,
                  pageStore.countRows
                );
                onClose();
              }}
              boxShadow={"-2px 2px 0 0 #4682B4"}
              borderRadius={"0px"}
              border={"2px solid #4682B4"}
              bg={"white"}
              color={"black"}
              _hover={{ bg: "#4682B4", color: "white" }}
              flexShrink={0}
            >
              Выбрать
            </Button>
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
});

export default ModalSelectBase;
