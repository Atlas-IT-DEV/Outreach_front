import React from "react";
import {
  Box,
  Text,
  Button,
  useToast,
  VStack,
  Textarea,
  Input,
} from "@chakra-ui/react";
import VideoPlayer from "./hls_player";
import { useStores } from "../store/store_context";
import { observer } from "mobx-react-lite";
import HLSPlayer from "./hls_player_hls";

const VideoInfo = observer(({ video }) => {
  const toast = useToast();
  const { pageStore } = useStores();
  // Функция для копирования hls_url в буфер обмена
  const copyToClipboard = () => {
    console.log(video);
    navigator.clipboard.writeText(video.video_id).then(() => {
      toast({
        title: "Скопировано!",
        description: "Ссылка на плейлист скопирована в буфер обмена.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <VStack borderWidth="1px" borderRadius="lg" p={4} bg="white" boxShadow="md">
      <HLSPlayer videoSrc={video.hls_url} />
      <Input
        fontSize="sm"
        mt={2}
        defaultValue={`${video.video_id}`}
        disabled
      ></Input>
      <Button
        color={"white"}
        backgroundColor={"#4682B4"}
        onClick={copyToClipboard}
      >
        Скопировать URL
      </Button>
    </VStack>
  );
});

export default VideoInfo;
