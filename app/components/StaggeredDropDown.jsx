import {
    FiEdit,
    FiChevronDown,
    FiTrash,
    FiShare,
    FiPlusSquare,
  } from "react-icons/fi";
  import { motion } from "framer-motion";
  import { useState } from "react";
  
  const StaggeredDropDown = ({ setIsOpen, setIsEditMode }) => {
    const [open, setOpen] = useState(false);
  
    return (
      <motion.div animate={open ? "open" : "closed"} className="relative ml-auto mb-2 z-[9]">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-[var(--color-primary-content)] bg-[var(--color-primary)] hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">Post actions</span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>
  
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option setOpen={setOpen} setIsEdit={setIsEditMode} Icon={FiEdit} text="Edit" />
          <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
          <Option setOpen={setOpen} Icon={FiShare} text="Share" />
          <Option setOpen={setOpen} setOpenModal={setIsOpen} Icon={FiTrash} text="Delete" />
        </motion.ul>
      </motion.div>
    );
  };
  
  const Option = ({ text, Icon, setOpen, setIsEdit, setOpenModal }) => {
    return (
      <motion.li
        variants={itemVariants}
        onClick={() => {
          setOpen(false);
          if (setIsEdit) setIsEdit(true);
          if (setOpenModal) setOpenModal(true);
        }}
        className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[var(--color-primary)] text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
      >
        <motion.span variants={actionIconVariants}>
          <Icon />
        </motion.span>
        <span>{text}</span>
      </motion.li>
    );
  };
  
  export default StaggeredDropDown;
  
  const wrapperVariants = {
    open: {
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    closed: {
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };
  
  const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
      },
    },
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        when: "afterChildren",
      },
    },
  };
  
  const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
  };