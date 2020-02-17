import React, { useState } from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import { BaseButton } from "@diana-ui/button";

export const ModalComponent: React.FC = () => {
  const [show, updateShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          updateShow(true);
        }}
      >
        Open Modal
      </button>
      <Modal
        isOpen={show}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        onRequestClose={() => updateShow(false)}
      >
        <ModalHeader title="Title" description="Subtitle" />
        <ModalBody>CONTENT</ModalBody>
        <ModalFooter>
          <BaseButton>Coisas qwew</BaseButton>
          <BaseButton>Outras coisas</BaseButton>
        </ModalFooter>
      </Modal>
    </>
  );
};
