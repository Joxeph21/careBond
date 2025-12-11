"use client"
import Button from '@/components/common/Button'
import useOtpInput from '@/hooks/useOtpInput'
import { useTimer } from '@/hooks/useTimer'
import React from 'react'

export default function Page() {
    const { handleKeyDown, setInputRef, handleKeyUp, values, } = useOtpInput(4)
    const { resetTimer, timer } = useTimer(30)




    return (
        <div className='w-full  col-center gap-5'>

            <div className='text-center space-y-1'>


                <h2 className='text-foreground text-[20px] font-medium'>Email OTP Verification</h2>
                <p className='text-grey-dark'>We sent a code to info@example.com</p>



            </div>

            <div className='w-full md:max-w-[80%] flex-between'>
                {Array.from({ length: 4 }).map((_, index) => <input key={index} inputMode="numeric"
                    maxLength={1}
                    ref={(el) => setInputRef(el, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                    value={values[index] || ""}
                    className='size-15 rounded-md ring focus:ring-[#3F8EF3] flex-center text-center font-bold text-lg ring-grey' type='text'


                />)}


            </div>

            <div className='w-full flex-between'>
                <p className='text-grey-dark'>Didn&apos;t recieve code. <button disabled={timer > 0} aria-label='Resend otp code' onClick={() => resetTimer(30)} className='text-primary cursor-pointer disabled:opacity-20 underline' type='button'>Resend Code</button></p>

                {timer > 0 && <p className='text-danger'>00:{timer}</p>}
            </div>

            <Button link href='/create-password' size='full'>Verify and Proceed</Button>

        </div>
    )
}
