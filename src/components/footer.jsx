import { HStack, VStack, Text, Divider } from "@chakra-ui/react";

const Footer = () => {
  return (
    <VStack width={"70vw"}>
      <Divider color={"gray.900"} width={"100%"} borderWidth="1px" zIndex={0} />
      <Text color={"rgba(48, 141, 218, 1)"}>© Copyright OUTREACH360</Text>
    </VStack>
  );
};

export default Footer;
