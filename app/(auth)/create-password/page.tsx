"use client"

import { Suspense } from "react"
import CreatePasswordContent from "./content"


export default function Page() {
  return <Suspense fallback={<div>Loading...</div>}>

    <CreatePasswordContent />
  </Suspense>
}
