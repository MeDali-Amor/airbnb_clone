"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ButtonRegular from "../buttons/ButtonRegular";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        typeof isOpen !== "undefined" && setShowModal(isOpen);
    }, [isOpen]);
    const handleClose = useCallback(() => {
        // if (disabled) return;
        setShowModal(false);
        setTimeout(() => onClose(), 300);
    }, [onClose]);
    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [disabled, onSubmit]);
    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;
    return (
        <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50  bg-neutral-800/70">
                <div className="relative w-full   md:w-4/6 lg:w-3/6 xl:w-2/5   mx-auto  max-h-[95vh]  my-6">
                    <div
                        className={`translate duration-300 ${
                            showModal ? "translate-y-0" : "translate-y-full"
                        } ${showModal ? "opacity-100" : "opacity-0"}`}
                    >
                        <div className="translate  rounded-lg shadow-lg relative flex flex-col bg-white  w-full ">
                            <div className="flex flex-row  px-6 py-3  justify-center items-center border-b-[1px]">
                                <div className="text-lg font-semibold ">
                                    {title}
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-1 border-0 hover:text-red-700 hover:rotate-90 hover:bg-red-100
                                    rounded-full
                                    transition absolute right-6"
                                >
                                    <IoMdClose size={20} />
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">{body}</div>
                            <div className="flex flex-col gap-2 px-6 mb-2">
                                <div className="flex flex-row items-center gap-4 w-full">
                                    {secondaryAction &&
                                        secondaryActionLabel && (
                                            <ButtonRegular
                                                fullWidth
                                                outlined
                                                label={secondaryActionLabel}
                                                disabled={disabled}
                                                onClick={handleSecondaryAction}
                                            />
                                        )}
                                    <ButtonRegular
                                        fullWidth
                                        // outlined
                                        label={actionLabel}
                                        disabled={disabled}
                                        onClick={handleSubmit}
                                        // size="small"
                                    />
                                </div>
                            </div>
                            <div className="relative px-6 my-2 flex-auto">
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
