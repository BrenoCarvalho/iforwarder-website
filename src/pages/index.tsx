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
import { FaTelegramPlane, FaYoutube } from "react-icons/fa";
import FaqContainer from "../components/faq/container.component";
import FaqCard from "../components/faq/card.component";
import { MdEmail } from "react-icons/md";
import { Analytics } from "@vercel/analytics/react";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Bot de repasse de mensagens para Telegram</title>
        <meta
          name="description"
          content="Encaminhe mensagens de forma automática e sem delay com um bot."
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
            href="https://t.me/iforwarder"
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
            iForwarder é um bot focado em automatizar o repasse de mensagens,
            como não tem relação com os grupos e canais, não tem a necessidade
            de ser ADM dos chts, apenas ter permissão para enviar mensagens no
            chat destinatário.
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
              text="No iForwarder as mensagens são enviadas instantâneamente, assim
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
              text="No iForwarder juntamente com o chat de origem, edita, marca e deleta a mensagem."
            />
          </Flex>
          <Flex
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
              alt="man ilustration"
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
              <Flex flexDirection="column">
                <Text
                  w="100%"
                  align="left"
                  fontSize="lg"
                  fontWeight="bold"
                  mb={2}
                >
                  Vitalício
                </Text>
                <Text
                  w="100%"
                  align="left"
                  fontSize="3xl"
                  mt={-3}
                  fontWeight="extrabold"
                >
                  R$ 297,90
                </Text>
              </Flex>
              <Divider w={"180px"} mt="6px" mb="20px" />

              <Heading size="md">É o que precisa?</Heading>
              <Heading size="md" color="#03a9f4">
                Garanta seu acesso agora mesmo.
              </Heading>
            </CardHeader>
            <Link
              href="https://t.me/iforwarder"
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
          </ChakraCard>
          <Flex
            w={["100%", "100%", "720px", "720px"]}
            h="100%"
            justifyContent="center"
            align="center"
            mt={["8", "8", "14", "14"]}
            direction="column"
            gap="4"
          >
            <Text fontSize="26px" fontWeight="bold">
              Perguntas
            </Text>
            <FaqContainer>
              <FaqCard
                question="Preciso ser adm dos chats?"
                answer="Não, apenas precisa ter permissão para encaminhar mensagem no chat destinatário."
              />
              <FaqCard
                question="Posso ser banido pelo Telegram?"
                answer="Em relação ao bot não tem risco nenhum de ser banido."
              />
              <FaqCard
                question="Encaminha mensagens de chats com restrição de salvar conteúdo?"
                answer="Sim, encaminha de qualquer tipo de chat, mesmo sendo privado e com restrições."
              />
              <FaqCard
                question="Preciso deixar o computador ligado para funcionar?"
                answer="Sim, ou você pode colocar o bot em um servidor VPS (máquina virtual)."
              />
              <FaqCard
                question="Onde posso tirar minhas dúvidas?"
                answer="Envie um email para brenocarvalho709@gmail.com ou se preferir, envie uma mensagem no Telegram @iforwarder"
              />
            </FaqContainer>
          </Flex>
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
          gap="2"
        >
          <Flex w="100%" justifyContent="center" align="center" gap="2">
            <Link href="https://t.me/iforwarder">
              <FaTelegramPlane fontSize="30" color="#718096" />
            </Link>
            <Link href="malito:brenocarvalho709@gmail.com">
              <MdEmail fontSize="30" color="#718096" />
            </Link>
            <Link href="https://www.youtube.com/watch?v=yqZivSaATo8">
              <FaYoutube fontSize="30" color="#718096" />
            </Link>
          </Flex>
          <Text color="#718096">© 2022. Todos direitos reservados.</Text>
        </Flex>
      </footer>

      <Analytics />
    </div>
  );
}
