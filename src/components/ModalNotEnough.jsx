import {
  Button,
  Center,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

export default function ModalNotEnough({ modalNotEnough, balance, timer }) {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        isOpen={modalNotEnough.isOpen}
        onClose={modalNotEnough.onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent bgColor={"#d7fccc"} w={"300px"}>
          <ModalHeader px={"10px"} display={"flex"} flexDir={"row-reverse"}>
            <Flex>
              <Button
                w={"30px"}
                onClick={() => {
                  modalNotEnough.onClose();
                }}
              >
                <Icon fontSize={"30px"} as={MdClose}></Icon>
              </Button>
            </Flex>
          </ModalHeader>

          <ModalBody pb={"60px"}>
            <Center
              color={balance >= 1000000 ? "#7bf757" : "crimson"}
              fontSize={"26px"}
              fontWeight={"600"}
            >
              {balance >= 1000000
                ? "You Win! You Finished In" + timer
                : "Not Enough!"}
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
