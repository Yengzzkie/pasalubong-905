"use client";
import React from "react";
import useMeasure from "react-use-measure";
import {
  useDragControls,
  useMotionValue,
  useAnimate,
  motion,
} from "framer-motion";
import ItemDetails from "./ItemDetails";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/navigation";
import { Avatar } from "@mui/material";

export const DragCloseDrawerExample = ({ selectedPost, open, setOpen }) => {

  return (
    <div>
      <DragCloseDrawer selectedPost={selectedPost} open={open} setOpen={setOpen}>
        <ItemDetails itemData={selectedPost} />
      </DragCloseDrawer>
    </div>
  );
};

export const DragCloseDrawer = ({ selectedPost, open, setOpen, children }) => {
  const router = useRouter();
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();

  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });

    const yStart = typeof y.get() === "number" ? y.get() : 0;

    await animate("#drawer", {
      y: [yStart, height],
    });

    setOpen(false);
  };

  return (
    <>
      {open && (
        <motion.div
          ref={scope}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-neutral-950/70"
        >
          <motion.div
            id="drawer"
            ref={drawerRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              ease: "easeInOut",
            }}
            className="absolute bottom-0 h-full w-full overflow-hidden bg-white"
            style={{ y }}
            drag="y"
            dragControls={controls}
            onDragEnd={() => {
              if (y.get() >= 100) {
                handleClose();
              }
            }}
            dragListener={false}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={{
              top: 0,
              bottom: 0.5,
            }}
          >
            <div className="sticky top-0 z-50 flex items-center bg-white p-2 border-b border-gray-200">
              <div onClick={() => router.push(`/user/${selectedPost.author?.id}`)} className="flex items-center gap-2 ml-4 cursor-pointer">
                <Avatar src={selectedPost.author?.avatar} alt={selectedPost.author?.name} />
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold">{selectedPost.author?.name}</h1>
                  <p className="text-xs lg:text-sm text-gray-500">Member since {new Date(selectedPost.author?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
                </div>
              </div>
              <button
                title="Drag to close"
                onClick={handleClose}
                onPointerDown={(e) => controls.start(e)}
                className="p-1 ml-auto mr-4 lg:mr-10 rounded-full bg-[var(--color-primary)] shadow-md hover:shadow-lg"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="relative z-0 h-full overflow-y-scroll p-4 mt-2">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};