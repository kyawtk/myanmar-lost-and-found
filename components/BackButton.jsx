import { useRouter } from 'next/navigation'
import React from 'react'
import { MdArrowBack, MdArrowCircleLeft } from 'react-icons/md'

const BackButton = () => {
    const router = useRouter()
  return (
    <div
        className="text-3xl md:text-4xl text-white hover:text-blue-200 w-fit ml-5 pt-5  rounded-full p-2 "
        onClick={() => router.back()}
      >
        <MdArrowCircleLeft></MdArrowCircleLeft>
      </div>
  )
}

export default BackButton