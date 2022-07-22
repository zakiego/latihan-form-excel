import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type ModalErrorInputProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ModalErrorInput = ({ isOpen, onClose }: ModalErrorInputProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Whoops!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Ada sesuatu yang salah. Silakan cek kembali file yang Anda upload.
            Pastikan format data sesuai dengan yang disediakan.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Coba Lagi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
