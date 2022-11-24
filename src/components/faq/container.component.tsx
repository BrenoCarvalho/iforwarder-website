import { Flex } from "@chakra-ui/react";

const FaqContainer = ({ children }: any) => {
  return (
    <Flex
      w="100%"
      h="100%"
      justifyContent="center"
      align="center"
      gap="3"
      direction="column"
    >
      {children}
    </Flex>
  );
};

export default FaqContainer;
