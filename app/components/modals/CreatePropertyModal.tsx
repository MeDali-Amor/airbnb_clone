"use client";
import { signIn } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Modal from "./Modal";
import RegularInput from "../inputs/RegularInput";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import RegularDivider from "../dividers/RegularDivider";
import ButtonRegular from "../buttons/ButtonRegular";
import { useRouter } from "next/navigation";
import useCreatePropertyModal from "@/app/hooks/usePropertyModal";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountriesSelect from "../inputs/CountriesSelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUplodaer from "../inputs/ImageUplodaer";
import TextArea from "../inputs/TextArea";

enum STEPS {
    CATEGORY = 1,
    LOCATION = 2,
    INFO = 3,
    IMAGES = 4,
    DESCRIPTION = 5,
    PRICE = 6,
}

const CreatePropertyModal = () => {
    const router = useRouter();
    const propertyModal = useCreatePropertyModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        return function cleanup() {
            if (!propertyModal.isOpen) setIsLoading(false);
        };
    }, [propertyModal.isOpen]);

    const onNext = () => {
        setStep((value) => (value + 1 <= 6 ? value + 1 : value));
    };
    const onPrevious = () => {
        setStep((value) => (value - 1 > 0 ? value - 1 : value));
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Continuer";
        }
        return "Suivant";
    }, [step]);
    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return "Retour";
    }, [step]);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            imageSrc: "",
            category: "",
            roomCount: 1,
            bathroomCount: 1,
            guestCount: 1,
            location: null,
            price: 1,
        },
    });
    const category = watch("category");
    const location = watch("location");
    const roomCount = watch("roomCount");
    const guestCount = watch("guestCount");
    const bathroomCount = watch("bathroomCount");
    const imageSrc = watch("imageSrc");
    const Map = useMemo(
        () => dynamic(() => import("../map/Map"), { ssr: false }),
        [location]
    );

    const setCustomValue = (name: string, value: any) => {
        setValue(name, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (values) => {
        if (step !== STEPS.PRICE) {
            console.log(step);
            return onNext();
        }
        setIsLoading(true);
        console.log(values);
        axios
            .post("/api/listings", values)
            .then(() => {
                toast.success("Votre proprété a été ajoutée avec succès");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                propertyModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong!");
            })
            .finally(() => setIsLoading(false));
    };

    const CategoryStep = (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-2xl font-semibold">
                    Parmi les propositions suivantes, laquelle décrit le mieux
                    votre logement ?
                </div>
                <div className="text-neutral-500 text-md">
                    Choisissez une catégorie
                </div>
            </div>
            <div className="grid grid-cols-1  xs:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto px-1">
                {categories.map((el) => (
                    <div key={el.label} className="col-span-1">
                        <CategoryInput
                            label={el.label}
                            icon={el.icon}
                            onClick={(category) =>
                                setCustomValue("category", category)
                            }
                            selected={category === el.label}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
    const LocationStep = (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-2xl font-semibold">
                    Où est situé votre logement ?
                </div>
                <div className="text-neutral-500 text-md">
                    Votre adresse est uniquement communiquée aux voyageurs une
                    fois leur réservation effectuée.
                </div>
            </div>
            <CountriesSelect
                value={location}
                onChange={(value) => setCustomValue("location", value)}
            />
            <Map center={location?.latlng} />
        </div>
    );
    const InfoStep = (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-2xl font-semibold">
                    {"Commençons par l'essentiel"}
                </div>
                <div className="text-neutral-500 text-md">
                    Combien de personnes pouvez-vous accueillir ?
                </div>
            </div>
            <Counter
                title="Voyageurs"
                value={guestCount}
                onChange={(value) => setCustomValue("guestCount", value)}
            />
            <hr />
            <Counter
                title="Chambres"
                value={roomCount}
                onChange={(value) => setCustomValue("roomCount", value)}
            />
            <hr />
            <Counter
                title="Salles de bains"
                value={bathroomCount}
                onChange={(value) => setCustomValue("bathroomCount", value)}
            />
        </div>
    );
    const DescriptionStep = (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-2xl font-semibold">
                    {" "}
                    À présent, donnez un titre à votre annonce
                </div>
                <div className="text-neutral-500 text-md">
                    {
                        "Les titres courts sont généralement les plus efficaces. Ne vous inquiétez pas, vous pourrez toujours le modifier plus tard."
                    }
                </div>
            </div>
            <RegularInput
                id="title"
                name="title"
                label="Titre"
                register={register}
                required
                errors={errors}
                disabled={isLoading}
            />
            <TextArea
                id="description"
                name="description"
                label="Description"
                register={register}
                required
                errors={errors}
                disabled={isLoading}
            />
        </div>
    );
    const PriceStep = (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-2xl font-semibold">
                    {" "}
                    À présent, fixez votre prix
                </div>
                <div className="text-neutral-500 text-md">
                    Vous pouvez le modifier à tout moment.
                </div>
            </div>
            <RegularInput
                id="price"
                name="price"
                label="Prix par nuit"
                register={register}
                required
                errors={errors}
                type="number"
                formatPrice
            />
        </div>
    );
    const ImageStep = (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-2xl font-semibold">
                    Ajoutez quelques photos de votre appartement
                </div>
                <div className="text-neutral-500 text-md">
                    {"Pour commencer, vous aurez besoin d'une photo"}
                </div>
            </div>
            <ImageUplodaer
                value={imageSrc}
                onChange={(value) => setCustomValue("imageSrc", value)}
            />
        </div>
    );

    const footer = <div className="flex flex-col gap-4"></div>;
    const stepContent = () => {
        switch (step) {
            case STEPS.CATEGORY:
                return CategoryStep;
            case STEPS.LOCATION:
                return LocationStep;
            case STEPS.INFO:
                return InfoStep;
            case STEPS.IMAGES:
                return ImageStep;
            case STEPS.DESCRIPTION:
                return DescriptionStep;
            case STEPS.PRICE:
                return PriceStep;
            default:
                return CategoryStep;
        }
    };
    const body = stepContent();

    const [mounted, setMounted] = useState(propertyModal.isOpen);

    return (
        <Modal
            title="Mettez votre logement sur Airbnb!"
            disabled={isLoading}
            isOpen={propertyModal.isOpen}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onPrevious}
            onClose={propertyModal.onClose}
            body={body}
            footer={footer}
        />
    );
};

export default CreatePropertyModal;
