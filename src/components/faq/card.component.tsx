import {
  Card,
  Collapse,
  Divider,
  Flex,
  ScaleFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const FaqCard = ({ question, answer }: any) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Card
      onClick={() => onToggle()}
      borderRadius="8"
      paddingX="5"
      paddingY="3"
      w="100%"
      userSelect={"none"}
    >
      <Flex justifyContent="space-between" gap="2">
        <Text w="100%">{question}</Text>
        {isOpen ? (
          <MdKeyboardArrowUp fontSize="26px" />
        ) : (
          <MdKeyboardArrowDown fontSize="26px" />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ width: "100%" }}>
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Divider mb="8px" mt="10px" w="100%" />
          <Text color={"#008bc9"}>{answer}</Text>
        </ScaleFade>
      </Collapse>
    </Card>
  );
};

export default FaqCard;
