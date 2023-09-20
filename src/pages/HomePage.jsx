import { Button, Center, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import ModalNotEnough from "../components/ModalNotEnough";
import { ImBlocked } from "react-icons/im";

export default function HomePage() {
  const [timerRunning, setTimerRunning] = useState(true);
  const [balance, setBalance] = useState(200);
  const [timer, setTimer] = useState(0);
  const [tapMoney, setTapMoney] = useState(1);
  const [userMps, setUserMps] = useState(1);
  const modalNotEnough = useDisclosure();
  const [debuffs, setDebuffs] = useState([
    {
      name: "clickDisabled",
      desc: "Your click muscles are strained!",
      applied: false,
      duration: 0,
    },
    {
      name: "IRSAgent",
      desc: "Shiet! the IRS is here!",
      applied: false,
      duration: 0,
    },
  ]);
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
      <Flex bgColor={"#d7fccc"}>
        <Sidebar
          debuffs={debuffs}
          setDebuffs={setDebuffs}
          balance={balance}
          setBalance={setBalance}
          setTapMoney={setTapMoney}
          tapMoney={tapMoney}
          userMps={userMps}
          setUserMps={setUserMps}
        />

        <Flex w={"100%"} h={"100%"} flexDir={"column"}>
          <Flex pl={"50px"} gap={"20px"}>
            <Flex
              flexDir={"column"}
              display={debuffs[0].applied ? "block" : "none"}
            >
              <Icon
                border={"crimson 1px solid"}
                bgColor={"white"}
                fontSize={"40px"}
                color={"red"}
                as={ImBlocked}
              ></Icon>
              <Flex pl={"25px"} mt={"-7px"}>
                {Math.round(debuffs[0].duration)}
              </Flex>
            </Flex>
          </Flex>
          <Center pt={"100px"}>
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
          <Center w={"100%"} h={"100%"} pt={"100px"}>
            <Button
              w={{ base: "100px", xl: "200px" }}
              h={{ base: "60px", xl: "120px" }}
              bgColor={"#7bf757"}
              _hover={{ bgColor: "#98f779" }}
              onClick={click}
              isDisabled={debuffs[0].applied}
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
