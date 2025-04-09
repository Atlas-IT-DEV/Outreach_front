import { VStack, HStack, Text } from "@chakra-ui/react";

import CallsSearch from "./calls_search_journal";
import CampaignAnalytics from "./campaign_analytics";

const CallsJournal = () => {
  return (
    <VStack width={"100%"} align={"flex-start"} paddingTop={["20px", "40px"]}>
      <Text color={"#4682B4"} fontWeight={500} fontSize={["16px", "20px"]}>
        Аналитика звонков
      </Text>
      {/* <CallsSearch /> */}
      <HStack
        maxW={"100%"}
        width={"100%"}
        overflowX={"scroll"}
        overflowY={"hidden"}
      >
        <CampaignAnalytics />
        <CampaignAnalytics />
        <CampaignAnalytics />
      </HStack>
    </VStack>
  );
};

export default CallsJournal;
