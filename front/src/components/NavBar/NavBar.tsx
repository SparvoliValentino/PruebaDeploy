"use client"

import Image from 'next/image';
import Link from 'next/link';
import Search from '../Search';
import { useCart } from '@/context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/Authcontext';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const { cartCount } = useCart();
  //const { role } = useAuth(); // Assuming you have an auth context

  //Remplazo provicional del useAuth()
  // const [role, setRole] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const userSession = JSON.parse(localStorage.getItem('userSession') || "{}");
  //     setRole(userSession.userData?.rol);
  //     console.log(userSession);
  //   }
  // }, []);
  const role:string = "user"
  const suscription = true;

  return (
    <div className="w-full bg-[#232323] p-4 md:p-8">
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-y-4 md:gap-y-0">
        {/* Logo y Nombre */}
        <Link href="/">
          <div className="flex items-center justify-center md:justify-start">
            <img
              src="https://s3-alpha-sig.figma.com/img/9b24/ab51/4afde8507a88429e72fe3362ccbebe43?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dRsBfIogFmR3yUGOV6dEjMC0MH7NFtW4-NXo6eeUhCZ3JbHKzWNMKHYg08~IiruoGURhyL1PcSY~phZaTgFvbBsq7DxAE0LJF3UNRglelYEi4dt7GPmHhDSk-LbBkQ6to1ddesbQGtU4m-jfMaaT3ShKm82V0aFOFJoT9ng8chimHLKaxz5qYkZC1JCP158GzA3worP-RIqK9QObZ3gjouw2-9MYaRKhnpuS9CSIbOCoAZaGZskMAlo~KjXAs3-q03rEtEeTW~J3eAeUhU-Xmwt5ruo7KEkOG1Arycn-wCaLsDBkyWbWegXNEqgKj8LcDCD2GFSQyHjKeHg9X6DX3Q__"
              alt="Logo"
              className="w-[50px] h-[50px] md:w-[100px] md:h-[100px]"
            />
            <span className="text-[24px] md:text-[40px] font-Tilt-neon text-[#A065FF] ml-2 md:ml-4">
              Cybergames
            </span>
          </div>
        </Link>

        {/* Barra de búsqueda */}
        <div className="flex justify-center md:justify-center w-full">
          <Search />
        </div>

        {/* Login/Register */}

        <div className="flex justify-center md:justify-end">
          {
            role === undefined ? (
              <div className="bg-[#A065FF] text-white rounded-xl px-4 py-2 text-center">
                <span className="text-[16px] md:text-[25px] font-Tilt-neon">
                  <Link href="/login">Log In</Link> / <Link href="/register">Register</Link>
                </span>
              </div>
            ) : (
              <div className='bg-white rounded-full w-[100px] h-[100px] flex justify-center items-center'>
                <Link href={"/dashboard"}>
                  <FontAwesomeIcon icon={faUser} className='text-[50px]' />
                </Link>
              </div>
            )
          }

        </div>
      </div>

      {/* Divider */}
      <div className="mt-4 w-full max-w-[1500px] mx-auto h-[3px] bg-[#A065FF] rounded-3xl" />

      {/* Links distribuidos en el ancho del contenedor */}
      {role !== "administrator" ? (
        role !== "user" ? (
          // Mostrar solo botón de comprar si el rol no es admin ni user
          <div className="w-full max-w-[1500px] mx-auto flex flex-wrap justify-evenly mt-4 px-4 md:px-8">
            <Link href="/products" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
              Games
            </Link>
            <Link href="/subscription" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
              Subscription
            </Link>
          </div>
        ) : (
          // Mostrar botones de navegación si el rol es user
          <div className="w-full max-w-[1500px] mx-auto flex flex-wrap justify-between mt-4 px-4 md:px-8">
            <Link href="/home" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
              Home
            </Link>
            <Link href="/products" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
              Games
            </Link>
            <Link
              href={suscription ? "/cybergamer" : "/subscription"}
              className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]"
            >
              {suscription ? "Cybergamer" : "Subscription"}
            </Link>
            <Link href="/cart" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
              {
                cartCount === 0 ? (
                  <FontAwesomeIcon icon={faCartShopping} />
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCartShopping} bounce />
                    {cartCount > 0 && <span className="ml-2 text-sm font-semibold text-white">{cartCount}</span>}
                  </>
                )
              }
            </Link>
          </div>
        )
      ) : (
        <div className="w-full max-w-[1500px] mx-auto flex flex-wrap justify-between mt-4 px-4 md:px-8">
          <Link href="/products" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
            Games
          </Link>
          <Link href="/subscription" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
            Subscription
          </Link>
          <Link href="/dashboard" className="text-[#4046FF] text-[16px] md:text-[25px] font-Tilt-neon hover:text-[#606cff]">
            Admin configuration
          </Link>
        </div>
      )}

    </div>
  );
};

export default NavBar;