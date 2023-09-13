import {
  Button,
  Center,
  Flex,
  Icon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LiaBroomSolid, LiaHandPointerSolid } from "react-icons/lia";
import { MdWork, MdWorkHistory } from "react-icons/md";
import { BsFillPiggyBankFill } from "react-icons/bs";
import ModalNotEnough from "./ModalNotEnough";
import { useState } from "react";

export default function ({
  balance,
  setBalance,
  setTapMoney,
  tapMoney,
  userMps,
  setUserMps,
}) {
  const toast = useToast();
  const [upgradeClicks, setUpgradeClicks] = useState({
    name: "Upgrade Clicks",
    price: 10,
    icon: LiaHandPointerSolid,
  });
  const [doingChores, setDoingChores] = useState(150);
  const [internship, setInternship] = useState(1000);
  const [work, setWork] = useState(20000);
  const [bank, setBank] = useState(100000);

  const upgradeItems = [
    {
      name: upgradeClicks.name,
      price: upgradeClicks.price,
      icon: upgradeClicks.icon,
      set: setUpgradeClicks,
    },
    {
      name: "Doing Chores",
      price: doingChores,
      set: setDoingChores,
      mps: 15,
      icon: LiaBroomSolid,
    },
    {
      name: "Internship",
      price: internship,
      set: setInternship,
      mps: 50,
      icon: MdWork,
    },
    {
      name: "Work",
      price: work,
      set: setWork,
      mps: 2000,
      icon: MdWorkHistory,
    },
    {
      name: "Bank Accounts",
      price: bank,
      set: setBank,
      mps: 10000,
      icon: BsFillPiggyBankFill,
    },
  ];
  function upgrades({ name, price, mps, set }) {
    if (balance < price) {
      //   modalNotEnough.onOpen();
      toast({
        title: "Not enough money",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } else {
      if (name == "Upgrade Clicks") {
        setBalance(balance - price);
        setTapMoney(tapMoney + 1);
        set((prevState) => ({
          ...prevState,
          price: Math.ceil(price + price / 10),
        }));
      } else {
        setBalance(balance - price);
        setUserMps(userMps + mps);
        set(Math.floor(price + price / 10));
      }
    }
  }
  return (
    <>
      <Flex position={"sticky"} left={0} bgColor={"#7bf757"}>
        <Flex flexDir={"column"}>
          <Center
            fontSize={"1.3rem"}
            fontWeight={"600"}
            color={"white"}
            py={"30px"}
          >
            Upgrades
          </Center>
          <Flex>
            <Flex px={"20px"} flexDir={"column"} gap={"20px"}>
              {upgradeItems.map((val) => {
                return (
                  <Flex
                    onClick={() => {
                      upgrades({
                        name: val.name,
                        price: val.price,
                        mps: val.mps,
                        set: val.set,
                      });
                    }}
                    bgColor={"#d7fccc"}
                    borderRadius={"10px"}
                    cursor={"pointer"}
                  >
                    <Flex flexDir={"column"} pl={"10px"}>
                      <Flex color={"#1e6b05"} fontWeight={"700"} w={"150px"}>
                        {val.name}
                      </Flex>
                      <Flex color={"#1e6b05"} fontWeight={"500"} mr={"20px"}>
                        {val.price} $
                      </Flex>
                    </Flex>
                    <Center>
                      <Icon fontSize={"30px"} as={val.icon}></Icon>
                    </Center>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
