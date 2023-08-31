'use client';

import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import Heading from "@/app/components/Heading";
import { categories } from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelected from "@/app/components/inputs/CountrySelected";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
};

const RentModal = () => {

    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            image: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category')
    const location = watch('location')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false,
    }), [location])

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Ajouter';
        }
        return 'Suivant';
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }
        return 'Retour';
    }, [step])

    let bodyContent = (
        <div className={'flex flex-col gap-8'}>
            <Heading
                title={'Lequel de ces termes décrit le mieux votre logement?'}
                subtitle={'Choisissez une categorie'}
            />
            <div
                className={'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'}
            >
                {
                    categories.map((item) => (
                        <div
                            key={item.label}
                            className={'col-span-1'}
                        >
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading
                    title={'Où est situé votre logement?'}
                    subtitle={'Aider les voyageurs à vous trouver!'}
                />
                <CountrySelected
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading
                    title={'Partagez quelques informations de base sur votre logement!'}
                    subtitle={'De quelles commodités disposez-vous ?'}
                />
                    <hr />
                    <Counter 
                        title="Invités"
                        subtitle="Combien d'invité autorisez-vous?"
                        value={guestCount}
                        onChange={(value) => setCustomValue('guestCount', value)}
                    />
                    <hr />
                    <Counter 
                        title="Pièces"
                        subtitle="Combien de nombre de pièce disponible?"
                        value={roomCount}
                        onChange={(value) => setCustomValue('roomCount', value)}
                    />
                    <hr />
                    <Counter 
                        title="Salles de bain"
                        subtitle="Combien de nombre de salle de bain sont-elles disponible?"
                        value={bathroomCount}
                        onChange={(value) => setCustomValue('bathroomCount', value)}
                    />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading
                    title={'Images!'}
                    subtitle={'De quelles commodités disposez-vous ?'}
                />

            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading
                    title={'Description!'}
                    subtitle={'De quelles commodités disposez-vous ?'}
                />

            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading
                    title={'Prix!'}
                    subtitle={'De quelles commodités disposez-vous ?'}
                />

            </div>
        )
    }



    return (
        <Modal
            title={'Sira espace'}
            onClose={rentModal.onClose}
            isOpen={rentModal.isOpen}
            onSubmit={onNext}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            body={bodyContent}
        />
    )
}

export default RentModal;