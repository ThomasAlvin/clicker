import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react";
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
          <form name="contact" method="POST" data-netlify="true">
            <p>
              <label>
                Your Name: <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Your Email: <input type="email" name="email" />
              </label>
            </p>

            <p>
              <label>
                Message: <textarea name="message"></textarea>
              </label>
            </p>
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
