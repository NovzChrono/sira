'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface listingReservationProps{
    price : number;
    totalPrice : number;
    onChangeDate: (value  : Range) => void;
    dateRange: Range ;
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
}


const ListingReservation : React.FC<listingReservationProps> = ({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,
}) => {
    return (
        <div className='bg-white rounded-xl border-[1px] border-zinc-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>
                    {price} FCFA
                </div>
                <div className='font-light text-zinc-600'>
                    nuité
                </div>
            </div>
            <hr />
            <Calendar
                value={dateRange}
                disabledDates={disabledDates} 
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr />
            <div className='p-4'>
                <Button
                    disabled={disabled}
                    label='Reservé'
                    onClick={onSubmit}
                />
            </div>
            <div className='p-4 flex flex-row items-center justify-center font-semibold text-lg'>
                <div>
                    Total
                </div>
                <div>
                    {totalPrice} FCFA
                </div>
            </div>
        </div>
    );
}
 
export default ListingReservation;