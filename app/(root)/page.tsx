"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export default function Home() {
  return (
    <div>
      <Modal
        title="test"
        description="test description"
        isOpen
        onClose={() => {}}
      >
        children
      </Modal>
    </div>
  );
}
