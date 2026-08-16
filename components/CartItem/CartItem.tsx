import Image from "next/image";
import ImageGameX from '@/assets/images/image-GameX-7.png'
import {
  FaSteam,
  FaStar,
  FaRegHeart,
  FaRegTrashAlt,
} from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import Link from "next/link";
import { IoChevronForward } from "react-icons/io5";

function CartItemRow() {
  return (
    <div className="grid grid-cols-[190px_1fr_120px_130px] items-center gap-5 border-b border-[#24143F] px-5 py-4 transition-all duration-300 hover:bg-[#120D22]">
      {/* ================= IMAGE ================= */}
      <div className="relative h-[105px] w-[180px] overflow-hidden rounded-xl">
        <Image
          src={ImageGameX}
          alt="Cyberpunk"
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* ================= INFO ================= */}
      <div>
        <h2 className="text-[24px] font-semibold text-white">
          Cyberpunk 2077
        </h2>

        <div className="mt-2 flex items-center gap-2 text-[14px] text-gray-400">
          <FaSteam size={15} className="text-white" />
          Steam Key
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="flex gap-1 text-[#A855F7]">
            <FaStar size={13} />
            <FaStar size={13} />
            <FaStar size={13} />
            <FaStar size={13} />
            <FaStar size={13} />
          </div>
          <span className="text-[13px] text-gray-500">(2.5k)</span>
        </div>

        <div className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#2A124A] px-2 py-1 text-[11px] text-[#D38CFF]">
          <BsLightningChargeFill size={10} />
          Digital Product
        </div>
      </div>

      {/* ================= PRICE ================= */}
      <div className="flex flex-col items-end">
        <h3 className="text-[28px] font-bold text-[#D946EF]">
          $29.99
        </h3>

        <div className="mt-5 flex gap-5 text-[12px] text-gray-400">
          <button className="flex items-center gap-1.5 transition hover:text-red-400">
            <FaRegTrashAlt size={12} />
            Remove
          </button>

          <button className="flex items-center gap-1.5 transition hover:text-pink-400">
            <FaRegHeart size={12} />
            Save
          </button>
        </div>
      </div>

      {/* ================= QUANTITY ================= */}
      <div className="justify-self-end">
        <div className="flex h-[42px] w-[120px] overflow-hidden rounded-xl border border-[#5B2CA8] bg-[#171028]">
          <button className="flex w-[38px] items-center justify-center text-gray-300 transition hover:bg-violet-700/20">
            <FiMinus size={15} />
          </button>

          <div className="flex flex-1 items-center justify-center border-x border-[#5B2CA8] text-[15px] font-medium">
            1
          </div>

          <button className="flex w-[38px] items-center justify-center text-gray-300 transition hover:bg-violet-700/20">
            <FiPlus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartItem() {
  return (
    <main className="min-h-screen bg-[#080613] text-white">
      <div className="mx-auto max-w-[1450px] px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-500 transition hover:text-white">
            Home
          </Link>
          <IoChevronForward size={13} className="text-gray-600" />
          <span className="text-violet-400">Cart</span>
        </div>

        {/* Layout */}
        <div className="flex items-start gap-8">
          {/* LEFT */}
          <div className="flex-1">
            {/* Title */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-700 bg-violet-600/10">
                <HiOutlineShoppingCart size={24} className="text-violet-400" />
              </div>
              <h1 className="text-[38px] font-bold uppercase tracking-wide">
                YOUR CART
              </h1>
              <span className="rounded-md bg-violet-700/20 px-3 py-1 text-sm font-medium text-violet-300">
                3 Items
              </span>
            </div>

            {/* Cart Items List */}
            <div className="overflow-hidden rounded-2xl border border-[#2B184A] bg-[#0D0918]">
              <CartItemRow />
              <CartItemRow />
              <CartItemRow />
            </div>

            {/* Continue Shopping */}
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm text-violet-400 transition hover:text-violet-300"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* RIGHT */}
          <aside className="sticky top-6 w-[350px] shrink-0">
            {/* <OrderSummary /> */}
          </aside>
        </div>
      </div>
    </main>
  );
}