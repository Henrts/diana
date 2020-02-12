import React, { useState } from "react";
import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import { BaseButton } from "@diana-ui/button";

const styleSheet: ThemeStyleSheetFactory = theme => ({});

export const ModalComponent: React.FC = () => {
  const [show, updateShow] = useState(false);
  const ModalRef = React.createRef<HTMLDivElement>();
  return (
    <>
      <button
        onClick={() => {
          updateShow(true);
        }}
      >
        Open Modal
      </button>
      {show && (
        <Modal
          isOpen={true}
          shouldCloseOnEsc
          shouldCloseOnOverlayClick
          onRequestClose={() => updateShow(false)}
        >
          <ModalHeader
            title="Title"
            description="Subtitle"
            onClose={() => alert("closeee!")}
          />
          <ModalBody>
            CONTENT
            <br />
            <br />
            <br />
            <br />
          </ModalBody>
          <ModalFooter>
            <BaseButton>Coisas qwew</BaseButton>
            <BaseButton>Outras coisas</BaseButton>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};
