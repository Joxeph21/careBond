import Image from "next/image";

export default function Logo() {
  return (
    <figure className='flex-center gap-2'>
<Image width={32} height={32} quality={80} src={"/logo.svg"} alt="Official CareBond logo" />
<p className="text-black font-bold text-xl">CareBond</p>
    </figure>
  )
}
