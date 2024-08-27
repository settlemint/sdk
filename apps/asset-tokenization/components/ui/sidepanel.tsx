"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SidePanel = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <div className="SidePanel relative flex ">
      {/* Button to open the sidebar */}
      <button
        type="button"
        onClick={togglePanel}
        className="fixed right-6 top-6 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Start Wizard
      </button>

      {/* Radix UI Dialog */}
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Background Overlay */}
              <motion.div
                className="fixed inset-0 bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closePanel}
              />

              {/* Side panel content with Framer Motion animation with drop shadow on the left side*/}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed overflow-y-auto scrollbar-hide top-0 right-0 h-full w-1/2 2xl:w-1/3 bg-white shadow-lg dark:bg-black dark:opacity-100 p-4 rounded-l-lg"
                style={{
                  boxShadow: "-4px 0 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                {/* Close Button */}
                <button type="button" onClick={togglePanel} className="absolute top-4 right-4 text-gray-500">
                  <Cross2Icon />
                </button>

                {/* Sidebar content */}
                <div className="SidePanel__content ">{children}</div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
};
SidePanel.displayName = "SidePanel";

export { SidePanel };
