import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import ModalNotEnough from "../components/ModalNotEnough";

export default function HomePage() {
  const [timerRunning, setTimerRunning] = useState(true);
  const [balance, setBalance] = useState(200);
  const [timer, setTimer] = useState(0);
  const [tapMoney, setTapMoney] = useState(1);
  const [userMps, setUserMps] = useState(1);
  const modalNotEnough = useDisclosure();

  function click() {
    setBalance(balance + tapMoney);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prevState) => prevState + userMps);
    }, 1000);
    return () => clearInterval(interval);
  }, [userMps]);
  useEffect(() => {
    let intervalId;
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimer((prevState) => prevState + 100);
      }, 100);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timerRunning]);

  function checkWin() {
    if (balance >= 1000000) {
      setTimerRunning(false);
    }
    modalNotEnough.onOpen();
  }
  return (
    <>
      <Flex w={"100vw"} h={"100vh"} bgColor={"#d7fccc"}>
        <Sidebar
          balance={balance}
          setBalance={setBalance}
          setTapMoney={setTapMoney}
          tapMoney={tapMoney}
          userMps={userMps}
          setUserMps={setUserMps}
        />
        <Flex w={"100%"} h={"100%"} flexDir={"column"}>
          <form name="contact" method="POST" netlify>
            <input type="hidden" name="form-name" value="contact" />
            <Flex gap={"60px"} justifyContent={"center"}>
              <Box>
                <Box>Your Name</Box>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ex : Tony"
                  h={"50px"}
                  w={{ base: "120px", lg: "290px", xl: "290px" }}
                  focusBorderColor={"crimson"}
                  autocomplete="off"
                  borderColor={"crimson"}
                  variant={"flushed"}
                ></Input>
                <Flex w={"100%"} fontSize={"12px"} color={"red"}>
                  lol{" "}
                </Flex>
              </Box>
              <Box>
                <Box>Your Email</Box>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Ex : tony@gmail.com"
                  w={{ base: "120px", lg: "290px", xl: "290px" }}
                  autocomplete="off"
                  h={"50px"}
                  borderColor={"crimson"}
                  focusBorderColor={"crimson"}
                  variant={"flushed"}
                ></Input>
                <Flex w={"100%"} fontSize={"12px"} color={"red"}></Flex>
              </Box>
            </Flex>
            <Center flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Flex>Your Message</Flex>
                <textarea
                  name="message"
                  id="message"
                  h={"100px"}
                  placeholder="Ex : Hi Thomas, I just want to say, Have a nice day!"
                  resize={"none"}
                  borderColor={"crimson"}
                  w={{ base: "300px", lg: "640px", xl: "640px" }}
                  focusBorderColor="crimson"
                  variant={"flushed"}
                ></textarea>
                <Flex w={"100%"} fontSize={"12px"} color={"red"}></Flex>
              </Flex>
            </Center>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
          <Center>
            <Button
              mt={"20px"}
              h={"60px"}
              bgColor={"#7bf757"}
              _hover={{ bgColor: "#98f779" }}
              onClick={checkWin}
              fontSize={{ base: "0.7rem", xl: "1rem" }}
            >
              Get To 1,000,000$ to win
            </Button>
          </Center>
          <Center fontWeight={"600"} w={"100%"} mt={"100px"}>
            {" "}
            Money Per Tap : {tapMoney}$
          </Center>
          <Center fontWeight={"600"} w={"100%"} mt={"20px"}>
            {" "}
            Money/s : {userMps}$
          </Center>
          <Center fontWeight={"600"} w={"100%"} mt={"20px"}>
            {" "}
            Your Balance : {balance}$
          </Center>
          <Center w={"100%"} h={"100%"}>
            <Button
              w={{ base: "100px", xl: "200px" }}
              h={{ base: "60px", xl: "120px" }}
              bgColor={"#7bf757"}
              _hover={{ bgColor: "#98f779" }}
              onClick={click}
            >
              Tap!
            </Button>
          </Center>
        </Flex>
      </Flex>
      <ModalNotEnough
        modalNotEnough={modalNotEnough}
        balance={balance}
        timer={timer}
        setTimerRunning={setTimerRunning}
      />
    </>
  );
}
