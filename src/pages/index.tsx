import {
  AspectRatio,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  Card as ChakraCard,
  CardHeader,
  Link,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import Card from "../components/Card.component";
import styles from "../styles/Player.module.css";
import { BsTelegram } from "react-icons/bs";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Bot de repasse de mensagens para Telegram</title>
        <meta
          name="description"
          content="Bot de encaminhamento automatico de mensagens para Telegram."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <Flex
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
          bg="#f7fafc"
          padding="8"
          direction="column"
        >
          {/* Head */}
          <Heading
            fontSize={["32px", "3xl", "3xl", "4xl"]}
            fontWeight="bold"
            textAlign="center"
            color="#1a202c"
            mt="3"
          >
            Encaminhamento automatico de mensagens{" "}
            <Text color="#03a9f4">para Telegram</Text>
          </Heading>
          <Text color="#718096" fontSize="20px" p="3.5" textAlign="center">
            Automatize sua função com um bot
          </Text>
          <AspectRatio
            mt="5"
            w={["100%", "100%", "650px", "650px"]}
            h={["185px", "300px", "370px", "370px"]}
            ratio={1}
            shadow="md"
            borderRadius="10px"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/yqZivSaATo8?controls=0"
              title="Video demonstrativo"
              allowFullScreen
              className={styles.player}
            />
          </AspectRatio>
          <Link
            href="https://telegram-control.pay.yampi.com.br/r/C5HWFDHVIX"
            style={{ textDecoration: "none" }}
          >
            <Button
              mt="10"
              mb="12"
              bg="#03a9f4"
              color="white"
              _hover={{ bg: "#008bc9" }}
            >
              Garantir acesso
            </Button>
          </Link>
          <Divider w={["75%", "75%", "70%", "50%"]} />
          <Text
            textAlign="center"
            w={["100%", "100%", "80%", "60%"]}
            color="#718096"
            mt="10"
          >
            Telegram Control é um bot focado em automatizar o repasse de
            mensagens, como não tem relação com os grupos e canais, não tem a
            necessidade de ser ADM dos chts, apenas ter permissão para enviar
            mensagens no chat destinatário.
          </Text>
          {/* Topics */}
          <Flex
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            direction={["column", "column", "column", "row"]}
            mt="16"
            gap="6"
          >
            <Card
              title="Sem delay"
              text="No Telegram Control as mensagens são enviadas instantâneamente, assim
          que chegadas no chat de origem."
            />
            <Card
              title="Formatador"
              text="Com formatador você pode configurar o bot para editar a mensagem antes do envio, podendo deixar a mensagem do seu jeito."
            />
            <Card
              title="Multiplos chats"
              text="Com a criação de multiplas instâncias você consegue pegar mensagens de vários chats e encaminhar para vários outros."
            />
          </Flex>
          <Flex
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            direction={["column", "column", "column", "row"]}
            mt="6"
            gap="6"
          >
            <Card
              title="Hospedagem"
              text="O bot está disponivel para Windows e precisa estar aberto para funcionar, porém se quiser pode colocar em uma vps."
            />
            <Card
              title="Filtro"
              text="Com filtro de mensagens você pode configurar o bot para pegar apenas as mensagens que quer, descartando o resto."
            />
            <Card
              title="Além do envio"
              text="No Telegram Control juntamente com o chat de origem, edita, marca e deleta a mensagem."
            />
          </Flex>
          <Flex
            minW={["", "", "", ""]}
            w={["100%", "90%", "750px", "950px"]}
            h="100%"
            padding="10"
            justifyContent="space-around"
            align="center"
            mt={["8", "8", "14", "14"]}
            direction={["column", "column", "row", "row"]}
            gap="8"
          >
            <Flex direction="column">
              <Text
                fontSize="32px"
                fontWeight="semibold"
                mr={["0", "0", "10", "10"]}
              >
                Envio imediato
              </Text>
              <Text fontSize="xl" fontWeight="normal">
                Apos a compra o bot será enviado imediatamente ao seu e-mail.
              </Text>
            </Flex>

            <Image
              src="ilustration.svg"
              alt=""
              width={["100%", "90%", "300px", "400px"]}
            />
          </Flex>
          <Divider
            w={["75%", "75%", "70%", "50%"]}
            mt={["8", "8", "14", "14"]}
          />
          <ChakraCard
            direction={["column", "column", "row", "row"]}
            alignItems="center"
            justifyContent="space-around"
            w={["100%", "100%", "100%", "52%"]}
            minW={["0", "0", "0", "800px"]}
            minH="140px"
            mt={["9", "9", "14", "14"]}
            p="3"
          >
            <CardHeader>
              <Heading size="md">É o que precisa?</Heading>
              <Heading size="md" color="#03a9f4">
                Garanta seu acesso agora mesmo.
              </Heading>
            </CardHeader>
            <Flex gap="2" align="center">
              <Link
                href="https://telegram-control.pay.yampi.com.br/r/C5HWFDHVIX"
                style={{ textDecoration: "none" }}
              >
                <Button
                  bg="#03a9f4"
                  color="white"
                  _hover={{ bg: "#008bc9" }}
                  mb={["4", "4", "0", "0"]}
                  mt={["1", "1", "0", "0"]}
                >
                  Garantir acesso
                </Button>
              </Link>
              <Link href="https://t.me/brenocarvalho1">
                <BsTelegram fontSize="37" color="#03a9f4" />
              </Link>
            </Flex>
          </ChakraCard>
        </Flex>
      </main>

      {/* Footer */}
      <footer>
        <Flex
          w="100%"
          h="100%"
          justifyContent="center"
          alignItems="center"
          padding="5"
          bg="#f7fafc"
          direction="column"
        >
          <Text color="#718096">© 2022. Todos direitos reservados.</Text>
        </Flex>
      </footer>
    </div>
  );
}
