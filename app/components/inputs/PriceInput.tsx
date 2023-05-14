"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiEuro } from "react-icons/bi";

interface InputProps {
    id?: string;
    name: string;
    label: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const PriceInput: React.FC<InputProps> = ({
    id,
    name,
    label,
    disabled = false,
    required = false,
    register,
    errors,
}) => {
    // console.log(errors[name]);
    return (
        <div
            className={`w-full p-[0px] border-[1px] relative border-neutral-400 rounded-lg  ${
                errors[name]
                    ? "border-red-600 focus-within:border-red-600 "
                    : "border-neutral-400 focus-within:border-none"
            }`}
        >
            <BiEuro
                size={22}
                className="text-neutral-700 absolute top-[24px] left-2"
            />

            <input
                // type={"number"}
                id={id}
                disabled={disabled}
                pattern="[0-9]*"
                // value={"Hello"}
                {...register(name, { required })}
                placeholder={"00"}
                className={`peer w-full text-base px-4 pb-2 pt-6 bg-white border-[1px]  rounded-[7px] outline-none 
        placeholder-neutral-500 
                disabled:opacity-70 disabled:cursor-not-allowed 
                ${
                    errors[name]
                        ? "border-red-600 bg-red-100 focus:border-red-600"
                        : "border-neutral-300 bg-white  focus:border-black focus:border-[2px]"
                }`}
            />
            {/* <label
                htmlFor={id}
                className={`absolute text-md duration-300 transform -translate-y-3 top-3 left-[0.5px] z-10 origin-[0] ${
                    errors[name] ? "text-red-600" : "text-neutral-500"
                } ${
                    formatPrice ? "pl-9" : "pl-4"
                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[8px] peer-focus:scale-[85%] peer-focus:-translate-y-[8px] peer-focus:font-light`}
            >
                {label}
            </label> */}
        </div>
    );
};

export default PriceInput;
