import { Card, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FaqCard = ({ question, answer }: any) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Card
      onClick={() => setOpen(!isOpen)}
      borderRadius="8"
      paddingX="4"
      paddingY="2"
      gap="2"
      w="100%"
    >
      <Flex justifyContent="space-between" gap="2">
        <Text w="100%">{question}</Text>
        {isOpen ? (
          <MdKeyboardArrowUp fontSize="26px" />
        ) : (
          <MdKeyboardArrowDown fontSize="26px" />
        )}
      </Flex>
      {isOpen ? (
        <>
          <Divider />
          <Text>{answer}</Text>
        </>
      ) : null}
    </Card>
  );
};

export default FaqCard;
