import { Spinner, VStack, Text } from "@chakra-ui/react";

const SpinnerCustom = ({ text }) => {
  return (
    <VStack position={"fixed"} top={"48vh"}>
      <Spinner color="rgb(73, 69, 255)" size={"md"} />
      <Text color={"rgb(73, 69, 255)"} fontSize={22} fontWeight={"600"}>
        {text}
      </Text>
      <Text fontSize={22} fontWeight={"600"} color={"red"}>
        ДОЖДИТЕСЬ ОКОНЧАНИЯ ЗАГРУЗКИ!
      </Text>
    </VStack>
  );
};

export default SpinnerCustom;
