import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserAuthForm } from './components/UserAuthForm'

const AuthPage = async () => {

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
          href="/"
          className={cn(
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          <Button >
          Home Page
          </Button>
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center gap-4 text-lg font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.0" className='w-10 h-10' viewBox="0 0 242.000000 239.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,239.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M962 2345 c-168 -35 -296 -90 -452 -195 -86 -58 -234 -204 -290 -285 -79 -115 -172 -336 -186 -443 l-7 -52 56 0 55 0 7 38 c35 196 135 380 283 526 139 137 293 227 480 281 347 101 743 16 1013 -217 53 -46 115 -107 138 -135 105 -134 184 -285 210 -403 22 -96 17 -90 78 -90 l56 0 -7 40 c-26 164 -139 394 -264 537 -104 118 -129 141 -248 221 -210 142 -416 203 -684 201 -91 0 -156 -7 -238 -24z"/>
                <path d="M1181 1961 c-10 -10 -26 -43 -36 -72 -24 -73 -175 -466 -233 -607 -55 -133 -59 -129 -61 44 -1 99 -3 113 -22 130 -18 17 -23 17 -46 4 -15 -8 -29 -26 -33 -40 -3 -14 -4 -120 -1 -237 6 -206 7 -212 30 -237 71 -75 110 -16 282 424 29 74 62 155 75 180 l23 45 1 -563 c0 -364 4 -570 10 -582 27 -50 80 -48 107 3 19 36 83 202 147 382 46 127 112 293 143 360 l18 40 3 -125 c2 -98 6 -128 19 -142 23 -26 48 -22 74 10 21 27 21 31 15 242 -7 200 -9 216 -28 237 -12 13 -31 23 -43 23 -55 0 -88 -56 -195 -335 -31 -82 -79 -206 -106 -275 l-49 -125 -5 596 c-5 569 -6 598 -24 618 -24 26 -40 27 -65 2z"/>
                <path d="M576 1571 c-15 -17 -17 -53 -17 -367 0 -192 0 -354 1 -361 1 -39 65 -56 93 -25 15 17 17 57 17 373 0 305 -2 358 -16 377 -19 27 -55 29 -78 3z"/>
                <path d="M1787 1572 c-15 -17 -17 -57 -17 -373 0 -385 2 -399 55 -399 25 0 55 23 56 43 0 7 0 169 -1 362 -1 305 -3 352 -17 367 -21 23 -55 23 -76 0z"/>
                <path d="M1986 1389 l-26 -20 0 -173 c0 -160 2 -175 21 -200 43 -54 90 -19 97 73 l4 58 156 6 c135 5 158 8 169 24 12 16 10 68 -3 82 -3 3 -76 5 -163 5 l-159 1 -4 64 c-3 52 -9 67 -27 82 -29 24 -32 24 -65 -2z"/>
                <path d="M380 1386 c-6 -8 -12 -41 -13 -73 l-2 -58 -150 -6 c-82 -4 -160 -7 -172 -8 -19 -1 -23 -7 -23 -34 0 -65 9 -69 183 -75 l157 -5 0 -39 c0 -46 24 -104 48 -113 9 -3 27 3 42 13 25 19 25 20 28 192 2 142 0 177 -13 196 -18 28 -65 33 -85 10z"/>
                <path d="M30 982 c0 -9 9 -49 20 -87 77 -270 241 -506 458 -658 143 -100 269 -160 413 -194 102 -25 132 -27 294 -27 159 0 192 3 285 26 271 67 515 231 691 463 75 100 176 335 195 455 l7 40 -56 0 -55 0 -16 -72 c-61 -273 -289 -556 -550 -684 -106 -53 -252 -101 -344 -114 -276 -40 -599 41 -812 203 -202 154 -335 344 -396 565 l-28 102 -53 0 c-44 0 -53 -3 -53 -18z"/>
                </g>
              </svg>
            Pulse
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8 p-10">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthPage