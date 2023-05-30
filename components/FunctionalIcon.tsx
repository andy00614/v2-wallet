import { Box, VStack, Text } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import React from "react";

// 定义接口
interface FunctionalIconProps {
  text: string;
  TypeIcon: any
  onClick?: () => void
}

const FunctionalIcon: React.FC<FunctionalIconProps> = ({ text, TypeIcon, onClick }) => {
  return (
    <VStack spacing={2}>
      <Box
        w={9} // 增大背景尺寸
        h={9} // 增大背景尺寸
        bg="blue.500" // 浅灰色背景
        borderRadius="full" // 设定为"full"以获得圆形效果
        display="flex" // 使Icon居中
        alignItems="center" // 在垂直方向上居中
        justifyContent="center" // 在水平方向上居中
      >
        <Icon as={TypeIcon} w={5} h={5} color="white" className="cursor-pointer" onClick={onClick} /> {/* 深灰色图标 */}
      </Box>
      <Text fontSize="smaller" color="blue.500">{text}</Text> {/* 这里可以更改为你需要的文字和样式 */}
    </VStack>
  );
};

export default FunctionalIcon;
