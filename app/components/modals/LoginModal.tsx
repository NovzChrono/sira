'use client';

import axios from 'axios';
import {useCallback, useState} from "react";
import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { toast } from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            email : '',
            password : '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {
            ...data,
            redirect : false,
        }).then((callback)=>{
            setIsLoading(false);

            if (callback?.ok){
                toast.success('Vous êtes connecté!')
                router.refresh();
                loginModal.onClose();
            }

            if (callback?.error)
            {
                toast.error(callback.error);
            }
        })
    }

    const  toggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading
                title={'Bienvenue chez vous'}
                subtitle={'Connectez vous maintenant!'}
                center={false}
            />
            <Input
                id={'email'}
                label={'Email'}
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />

            <Input
                id={'password'}
                type={'password'}
                label={'Mot de passe'}
                disabled={isLoading}
                register={register}
                errors={errors}
                required={true}
            />
        </div>
    )

    const footerContent = (
        <div
            className={'flex flex-col gap-4 mt-3'}
        >
            <hr />
            <Button
                outline={true}
                label={'Connexion avec google'}
                icon={FcGoogle}
                onClick={() => signIn('google')}

            />
            <Button
                outline={true}
                label={'Connexion avec github'}
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className={'text-neutral-500 text-center mt-4 font-light'}>
                <div className={'justify-center flex flex-row tiems-center gap-2'}>
                    <div>Vous avez déja un compte?</div>
                    <div
                        className={'text-neutrale-800 cursor-pointer hover:underline'}
                        onClick={toggle}
                    >
                        S&apos;inscrire
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            title="Se connecter"
            actionLabel="Continue"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;