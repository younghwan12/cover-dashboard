"use client";

import { signIn } from "next-auth/react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";

import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

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

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error) {
                toast.error(callback.error);
            }
        });
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="다시 오신 것을 환영합니다."
                subtitle="귀하의 계정에 로그인하십시오!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="구글로 로그인하기"
                icon={FcGoogle}
                onClick={() => signIn("google")}
            />
            <Button
                outline
                label="깃허브로 로그인하기"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className="text-neutral-400 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>이미 계정이 있으신가요?</div>
                    <div
                        onClick={registerModal.onClose}
                        className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        로그인
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="로그인"
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default LoginModal;
