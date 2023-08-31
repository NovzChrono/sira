'use client';

import axios from 'axios';
import {useCallback, useState} from "react";
import { FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {FcGoogle} from "react-icons/fc";
import {AiFillGithub} from "react-icons/ai";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues : {
            name : '',
            email : '',
            password : '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data).then(()=>{
            registerModal.onClose();
        }).catch((error)=>{
            toast.error('Quelque chose s\'est mal passée ');
            console.log(error);
        }).finally(()=>{
            setIsLoading(false);
        });
    }

    const  toggle = useCallback(()=>{
        registerModal.onClose();
        loginModal.onOpen();
    },[loginModal, registerModal])

    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading
                title={'Bienvenue sur Sira'}
                subtitle={'Crée votre compte maintenant!'}
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
                id={'name'}
                label={'Nom et prénoms'}
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
                        Se connecter
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            title="Inscription"
            actionLabel="Continue"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;