import { VStack, HStack, Text } from "@chakra-ui/react";
import { useStores } from "../../store/store_context";
import { observer } from "mobx-react-lite";
import CallsSearch from "./calls_search_journal";
import CampaignAnalytics from "./campaign_analytics";

const CallsJournal = () => {
  return (
    <VStack width={"100%"} align={"flex-start"} paddingTop={["20px", "40px"]}>
      <Text color={"#4682B4"} fontWeight={500} fontSize={["16px", "20px"]}>
        Аналитика звонков
      </Text>
      <CallsSearch />
      <HStack
        maxW={"60vw"}
        width={"60vw"}
        overflowX={"scroll"}
        overflowY={"hidden"}
      >
        <CampaignAnalytics />
        <CampaignAnalytics />
      </HStack>
    </VStack>
  );
};

export default CallsJournal;
