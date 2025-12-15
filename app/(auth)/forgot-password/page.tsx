
import React, { Suspense } from 'react'
import ForgotPasswordContent from './content'

export default function Page() {
    return <Suspense fallback={<div>Loading...</div>}>

        <ForgotPasswordContent />
    </Suspense>
}
