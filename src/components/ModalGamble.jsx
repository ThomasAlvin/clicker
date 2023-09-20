import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import heads from "../assets/fear-and-hunger-coin-toss-heads.gif";
import tails from "../assets/fear-and-hunger-coin-toss-tails.gif";
export default function ModalGamble({ setBalance, modalGamble, balance }) {
  const [rolling, setRolling] = useState(false);
  const [amount, setAmount] = useState(0);
  const [coin, setCoin] = useState("");
  function roll(chosen) {
    const chosenSide = chosen.target.id;
    setRolling(true);
    const dice = Math.random();
    if (dice <= 0.5) {
      if (chosenSide === "heads") {
        setBalance(balance + amount);
      } else {
        setBalance(balance - amount);
      }
      setCoin("heads");
    } else {
      if (chosenSide === "tails") {
        setBalance(balance + amount);
      } else {
        setBalance(balance - amount);
      }
      setCoin("tails");
    }
    setAmount(0);
    setTimeout(() => {
      setRolling(false);
      setCoin("");
    }, 3800);
  }
  function inputHandler(input) {
    const { value } = input.target;
    const tempObject = value;
    setAmount(parseInt(tempObject));
    console.log(amount);
  }
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isOpen={modalGamble.isOpen}
        onClose={modalGamble.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"black"} w={"300px"}>
          <ModalHeader w={"100%"} px={"10px"} display={"flex"} flexDir={"row"}>
            <Flex justifyContent={"space-between"} w={"100%"}>
              <Flex ml={"50px"} color={"yellow"}>
                HEADS OR TAILS!
              </Flex>

              <Button
                w={"30px"}
                onClick={() => {
                  modalGamble.onClose();
                }}
              >
                <Icon fontSize={"30px"} as={MdClose}></Icon>
              </Button>
            </Flex>
          </ModalHeader>

          <ModalBody pb={"20px"}>
            <Box overflowY={"hidden"}>
              <Center
                overflowY={"hidden"}
                flexDir={"column"}
                gap={"20px"}
                display={rolling ? "none" : "flex"}
              >
                <Box color={"yellow"}>{balance} $</Box>
                <Box color={"yellow"}>How Much ya Bettin'?</Box>
                <Input
                  value={amount}
                  onChange={inputHandler}
                  color={"white"}
                  type="number"
                ></Input>
                <Flex w={"100%"} justifyContent={"space-evenly"}>
                  <Button
                    border={"yellow 1px solid"}
                    bgColor={"black"}
                    color={"yellow"}
                    id="heads"
                    onClick={roll}
                  >
                    Heads!
                  </Button>
                  <Button
                    border={"yellow 1px solid"}
                    bgColor={"black"}
                    id="tails"
                    onClick={roll}
                    color={"yellow"}
                  >
                    Tails!
                  </Button>
                </Flex>
              </Center>
              <Center display={rolling ? "flex" : "none"}>
                {coin === "heads" ? (
                  <Image h={"440px"} w={"290px"} src={heads}></Image>
                ) : (
                  <Image h={"440px"} w={"290px"} src={tails}></Image>
                )}
              </Center>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
