"use client";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Modal from "./Modal";
import RegularInput from "../inputs/RegularInput";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import RegularDivider from "../dividers/RegularDivider";
import ButtonRegular from "../buttons/ButtonRegular";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        setIsLoading(true);
        axios
            .post("/api/register", values)
            .then((res) => {
                console.log(res);
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error(
                    error.message ? error.message : "Something went wrong"
                );
            })
            .finally(() => setIsLoading(false));
    };

    const RegisterFooter = (
        <div className="flex flex-col gap-4">
            <RegularDivider text="ou" />
            <ButtonRegular
                icon={FcGoogle}
                outlined
                color="contrast"
                label="Continuer avec Google"
                onClick={() => signIn("google")}
                fullWidth
            />
            <div className="text-neutral-500 text-center mb-4 font-light text-sm">
                <div className="flex flex-row justify-center items-center gap-3">
                    <div className="">Vous avez un compte?</div>
                    <div
                        onClick={() => {
                            registerModal.onClose();
                            loginModal.onOpen();
                        }}
                        className=" text-neutral-800 cursor-pointer hover:underline"
                    >
                        {"S'identifier"}
                    </div>
                </div>
            </div>
        </div>
    );
    const RegisterForm = (
        <div className="flex flex-col gap-4">
            <div className="text-2xl font-semibold">Bienvenue sur Airbnb</div>
            <form action="" className="flex flex-col gap-4">
                <RegularInput
                    id="email"
                    name="email"
                    label="Adresse e-mail"
                    register={register}
                    required
                    errors={errors}
                />
                <RegularInput
                    id="name"
                    name="name"
                    label="Nom"
                    register={register}
                    required
                    errors={errors}
                />
                <RegularInput
                    id="password"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    register={register}
                    required
                    errors={errors}
                />
            </form>
        </div>
    );

    return (
        <Modal
            title="Inscription"
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="Continuer"
            onClose={registerModal.onClose}
            body={RegisterForm}
            footer={RegisterFooter}
        />
    );
};

export default RegisterModal;
