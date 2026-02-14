import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className='flex-center cursor-pointer gap-2'>
<Image width={32} height={32} quality={75} src={"/logo.svg"} alt="Official CareBond logo" />
<p className="text-black font-bold text-xl">CareBond</p>
    </Link>
  )
}
