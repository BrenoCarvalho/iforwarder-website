import React from "react";
import {
  Card as ChakraCard,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";

const Card = ({ title, text }: { title: string; text: string }) => {
  return (
    <ChakraCard maxW="300px" variant="outline" borderRadius="lg" minH="260px">
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{text}</Text>
      </CardBody>
    </ChakraCard>
  );
};

export default Card;
