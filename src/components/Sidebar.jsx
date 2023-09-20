import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { LiaHandPointerSolid } from "react-icons/lia";
import { MdWork } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { GiPikeman } from "react-icons/gi";
import { ImUserTie } from "react-icons/im";
import { TbBusinessplan } from "react-icons/tb";
import { AiOutlineStock } from "react-icons/ai";
import { useState } from "react";
import { CheckSideEffect } from "../functions/CheckSideEffect";
import { FaDiceThree } from "react-icons/fa";
import ModalGamble from "./ModalGamble";

export default function SideBar({
  debuffs,
  setDebuffs,
  balance,
  setBalance,
  setTapMoney,
  tapMoney,
  userMps,
  setUserMps,
}) {
  const modalGamble = useDisclosure();
  const toast = useToast();
  const [description, setDescription] = useState("Welcome to Money Kliker!");
  const [effect, setEffect] = useState("");
  const [upgradeItems, setUpgradeItems] = useState([
    {
      name: "Upgrade Taps",
      price: 20,
      icon: LiaHandPointerSolid,
      MPS: 1,
      desc: "Upgrade your taps With better taps, but also be wary of muscle strains",
      effect:
        "Upgrading this has a tiny chance of restraining taps for 20 seconds",
      level: 1,
    },
    {
      name: "Manual labor",
      price: 100,
      icon: GiPikeman,
      MPS: 4,
      desc: "Manual labor can only take u so far in life, but everyone has to start somewhere right?",
      effect: "Can only be upgraded 5 times",
      maxLevel: 5,
      level: 0,
    },

    {
      name: "Internship",
      price: 600,
      icon: ImUserTie,
      MPS: 20,
      maxLevel: 5,
      desc: "again, internships can only take u so far in life, try getting a real job n00bz",
      effect: "Can only be upgraded 10 times",
      level: 0,
    },
    {
      name: "Small business",
      price: 3000,
      icon: TbBusinessplan,
      MPS: 100,
      desc: "a small business, well atleast small enough to hide under the IRS's radar, its a clean income but a poorly prepared business might attract unforeseen incidents",
      effect:
        "upgrading this has a small chance of reducing this upgrade's level by 2",
      level: 0,
    },
    {
      name: "Work",
      price: 10000,
      icon: MdWork,
      MPS: 600,
      desc: "finally a real job the cash flow is fine but aren't you cravin for more?, maybe ask your boss for a raise or that might be too risky?",
      effect:
        "upgrading this has a small chance of resetting this upgrade's level",
      level: 0,
    },
    {
      name: "Stock Market",
      price: 48000,
      icon: AiOutlineStock,
      MPS: 2000,
      multiplier: 100,
      desc: `you think to yourself "this amount of money is not enough! and work isn't paying even half the amount i wanted" so you decided to try buying stocks, but of course buying stocks is risky as hell, with another one's fortune comes with another's great loss`,
      effect:
        "upgrading this has a mediocre chance of permanently reducing the MPS for this upgrade by 20%",
      level: 0,
    },
    {
      name: "Bank",
      price: 180000,
      icon: BsBank2,
      MPS: 12000,
      desc: `Of course by owning a bank you also own a huge responsibility for it, but by ensuring safety to your client's money there's also taxes and fees for said safety, just keep all the money safe and watch the cash flow from all the small transactions`,
      effect:
        "upgrading this has a mediocre chance of getting robbed! reducing this'upgrade level by 1 and losing 50% of your current money",
      level: 0,
    },
  ]);
  function upgrades({ name, price, MPS, idx, level, maxLevel, multiplier }) {
    if (balance < price) {
      toast({
        title: "Not enough money",
        status: "error",
        position: "top",
        duration: 1400,
        isClosable: true,
      });
    } else {
      if (level >= maxLevel) {
        toast({
          title: "Limit Reached!",
          status: "error",
          position: "top",
          duration: 1400,
          isClosable: true,
        });
      } else {
        if (name === "Upgrade Taps") {
          setBalance(balance - price);
          setTapMoney(tapMoney + MPS);
          const updatedItems = [...upgradeItems];
          updatedItems[idx].price = Math.floor(price + price / 10);
          updatedItems[idx].level = level + 1;
          setUpgradeItems(updatedItems);
          CheckSideEffect({ debuffs, setDebuffs, name, toast });
        } else {
          setBalance(balance - price);
          if (multiplier) {
            setUserMps(userMps + MPS * (multiplier / 100));
          } else {
            setUserMps(userMps + MPS);
          }
          const updatedItems = [...upgradeItems];
          updatedItems[idx].price = Math.floor(price + price / 10);
          updatedItems[idx].level = level + 1;
          console.log(updatedItems[idx].level);
          CheckSideEffect({
            debuffs,
            setDebuffs,
            name,
            toast,
            setBalance,
            balance,
            updatedItems,
            level,
            idx,
            setUserMps,
            MPS,
            userMps,
            multiplier,
            price,
          });
          setUpgradeItems(updatedItems);
        }
      }
    }
  }
  return (
    <>
      <Flex position={"sticky"} left={0} bgColor={"#7bf757"}>
        <Flex flexDir={"column"} mb={"100px"}>
          <Center
            fontSize={"1.3rem"}
            fontWeight={"600"}
            color={"white"}
            py={"10px"}
          >
            Upgrades
          </Center>
          <Flex>
            <Flex px={"20px"} flexDir={"column"} gap={"10px"}>
              {upgradeItems.map((val, idx) => {
                return (
                  <Flex
                    onClick={() => {
                      upgrades({
                        name: val.name,
                        price: val.price,
                        MPS: val.MPS,
                        level: val.level,
                        maxLevel: val.maxLevel,
                        multiplier: val.multiplier,
                        idx,
                      });
                    }}
                    bgColor={"#d7fccc"}
                    onMouseEnter={() => {
                      setDescription(val.desc);
                      setEffect(val.effect);
                    }}
                    borderRadius={"10px"}
                    cursor={"pointer"}
                  >
                    <Flex flexDir={"column"} pl={"10px"}>
                      <Flex
                        color={"#1e6b05"}
                        fontWeight={"700"}
                        w={{ base: "100px", xl: "150px" }}
                        fontSize={{ base: "0.7rem", xl: "1rem" }}
                      >
                        {val.name}
                      </Flex>
                      <Flex pr={"10px"}>
                        <Box>
                          <Flex
                            width={"80px"}
                            justifyContent={"space-between"}
                            color={"#1e6b05"}
                            fontWeight={"500"}
                            mr={"20px"}
                            fontSize={{ base: "0.7rem", xl: "1rem" }}
                          >
                            {val.price} $
                          </Flex>
                          <Flex
                            color={"#1e6b05"}
                            fontWeight={"500"}
                            mr={"20px"}
                            fontSize={{ base: "0.7rem", xl: "1rem" }}
                          >
                            lvl : {val.level}
                          </Flex>
                        </Box>
                        <Center>
                          <Icon fontSize={"30px"} as={val.icon}></Icon>
                        </Center>
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </Flex>
          <Flex
            mx={"10px"}
            ml={"20px"}
            my={"20px"}
            borderRadius={"10px"}
            bgColor={"#d7fccc"}
            flexDir={"column"}
            w={{ base: "150px", xl: "200px" }}
            gap={"30px"}
          >
            <Box
              p={"10px"}
              color={"#1e6b05"}
              fontWeight={600}
              fontSize={"12px"}
              wordBreak={"break-word"}
            >
              {description}
            </Box>
            <Box
              p={"10px"}
              color={"crimson"}
              fontWeight={600}
              fontSize={"12px"}
              wordBreak={"break-word"}
            >
              {effect}
            </Box>
          </Flex>
          <Button
            mx={"10px"}
            ml={"20px"}
            my={"20px"}
            borderRadius={"10px"}
            bgColor={"#d7fccc"}
            gap={"20px"}
            fontSize={"20px"}
            onClick={modalGamble.onOpen}
          >
            Gamble
            <Icon fontSize={"30px"} as={FaDiceThree}></Icon>
          </Button>
          <ModalGamble
            setBalance={setBalance}
            modalGamble={modalGamble}
            balance={balance}
          />
        </Flex>
      </Flex>
    </>
  );
}
