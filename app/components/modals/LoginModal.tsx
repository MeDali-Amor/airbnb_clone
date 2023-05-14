"use client";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Modal from "./Modal";
import RegularInput from "../inputs/RegularInput";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import RegularDivider from "../dividers/RegularDivider";
import ButtonRegular from "../buttons/ButtonRegular";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        setIsLoading(true);
        signIn("credentials", {
            ...values,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success("Connecté avec succès");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const LoginFooter = (
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
                    <div className="">{"Vous n'avez pas un compte?"}</div>
                    <div
                        onClick={() => {
                            loginModal.onClose();
                            registerModal.onOpen();
                        }}
                        className=" text-neutral-800 cursor-pointer hover:underline"
                    >
                        {"S'inscrire"}
                    </div>
                </div>
            </div>
        </div>
    );
    const LoginForm = (
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
            title="Connexion"
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel="S'identifier"
            onClose={loginModal.onClose}
            body={LoginForm}
            footer={LoginFooter}
        />
    );
};

export default LoginModal;
