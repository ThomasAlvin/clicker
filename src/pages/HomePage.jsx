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
          <form
            name="contact"
            data-netlify="true"
            data-netlify-recaptcha="true"
          >
            <div class="form-group row">
              <label for="text" class="col-4 col-form-label">
                name
              </label>
              <div class="col-8">
                <input id="text" name="text" type="text" class="form-control" />
              </div>
            </div>
            <div class="form-group row">
              <label for="text1" class="col-4 col-form-label">
                email
              </label>
              <div class="col-8">
                <input
                  id="text1"
                  name="text1"
                  type="text"
                  class="form-control"
                  required="required"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="textarea" class="col-4 col-form-label">
                comments
              </label>
              <div class="col-8">
                <textarea
                  id="textarea"
                  name="textarea"
                  cols="40"
                  rows="5"
                  class="form-control"
                  aria-describedby="textareaHelpBlock"
                ></textarea>
                <span id="textareaHelpBlock" class="form-text text-muted">
                  what do you want to contact us about?
                </span>
              </div>
            </div>
            <div class="form-group row">
              <div class="offset-4 col-8" data-netlify-recaptcha="true"></div>
            </div>
            <div class="form-group row">
              <div class="offset-4 col-8">
                <button name="submit" type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
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
