"use client"

import { Suspense } from "react"
import VerifyContent from "./content"

export default function Page() {
    return <Suspense fallback={<div>Loading...</div>}>
        <VerifyContent />
    </Suspense>
}
