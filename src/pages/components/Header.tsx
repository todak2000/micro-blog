/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { GoogleLogo } from "@/constant";
import { useDispatch, useSelector } from "react-redux";
import {
  LogoText,
  SignOutText,
  NewArticleText,
  SignInTextMobile,
  SignInText,
} from "@/constant";
import { handleGoogleAuth } from "../api";
import { setUser, clearUser } from "@/store";
import { MdCreate } from "react-icons/md";
import { auth } from "@/firebase";
import { GrPowerShutdown } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { handleSignOut } from "../api";
import Swal from "sweetalert2";

const Header: React.FC = () => {
  const { push, pathname } = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);

  const [showDropDown, setShowDropDown] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    if (width > 768) {
      setShowDropDown(false);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
        };
        dispatch(setUser(userData as any));
      } else {
        dispatch(clearUser());
        if (pathname.includes("/edit/") || pathname.includes("/create/")) {
          handleLink("/");
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };
  const handleLink = (link: string) => {
    push(link);
  };

  const handleOut = () => {
    Swal.fire({
      title: "Are you sure you want to signout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const out: any = await handleSignOut();
        if (out.statusCode === 200) {
          dispatch(clearUser());
          Swal.fire({
            title: "Success!",
            text: "Logout successfully!",
            icon: "success",
          });
        } else {
          Swal.fire("Oops an error occured", "", "info");
        }
      }
    });
  };

  const handleGoogle = async () => {
    setLoading(true);
    const auth = await handleGoogleAuth();
    if (auth.statusCode === 200) {
      setLoading(false);
      dispatch(
        setUser({
          name: auth.name,
          email: auth.email,
          photo: auth.photo,
          uid: auth.uid,
        } as any)
      );
    }
  };

  return (
    <div className="bg-brand_primary  flex w-full flex-row items-center justify-between px-4 py-[40px]  md:px-[120px]">
      <div
        className="flex flex-shrink-0 cursor-pointer flex-row  items-center"
        onClick={() => handleLink("/")}
      >
        <Image src={GoogleLogo} alt="google logo" width={20} height={20} />
        <p className="header-text ml-2 text-black">{LogoText}</p>
      </div>
      <RxHamburgerMenu
        className="flex text-lg text-green-900 md:hidden"
        onClick={handleClick}
      />

      <div
        className={` ${
          showDropDown
            ? "absolute top-16 right-4 grid w-[120px] grid-cols-1 gap-4 bg-white py-4 drop-shadow-md "
            : "hidden flex-row items-center md:flex"
        }`}
      >
        {user?.uid !== "" ? (
          <>
            <Button
              variant="primary"
              className="mr-6 hidden md:flex"
              isLoading={loading}
              onClick={() => {
                handleLink("/create");
              }}
            >
              <MdCreate />
              <span className="ml-4 font-primary">{NewArticleText}</span>
            </Button>
            <p className=" font-regular ml-3  flex cursor-pointer flex-row items-center text-[12px] leading-[14px] text-black hover:font-bold hover:text-black md:mr-4 md:text-center">
              <CgProfile className="mr-1 flex md:hidden" />
              {user?.name.split(" ")[0]}
            </p>
            <Image
              src={user?.photo}
              alt="google logo"
              width={50}
              height={50}
              className="hidden rounded-full md:flex"
            />
            <p
              className=" font-regular ml-3  flex cursor-pointer flex-row items-center text-[12px] leading-[14px] text-black hover:font-bold hover:text-black md:mr-4 md:text-center"
              onClick={() => {
                handleLink("/create");
              }}
            >
              <MdCreate className="mr-1 flex md:hidden" />
              <span className="flex md:hidden">{NewArticleText}</span>
            </p>
            <p className=" font-regular ml-3  flex cursor-pointer flex-row items-center text-[12px] leading-[14px] text-black hover:font-bold hover:text-black md:mr-4 md:text-center">
              <GrPowerShutdown
                className="mr-1 flex cursor-pointer md:ml-4"
                onClick={handleOut}
              />
              <span
                className="flex cursor-pointer md:hidden"
                onClick={handleOut}
              >
                {SignOutText}
              </span>
            </p>
          </>
        ) : (
          <>
            <p
              className=" font-regular  ml-3 flex  cursor-pointer flex-row items-center text-[12px] leading-[14px] text-black hover:font-bold hover:text-black md:mr-4 md:hidden md:text-center"
              onClick={() => {
                handleGoogle();
              }}
            >
              <Image
                src={GoogleLogo}
                alt="google logo"
                width={10}
                height={10}
                className="mr-1 flex md:hidden"
              />
              {SignInTextMobile}
            </p>
            <Button
              variant="primary"
              className="hidden md:flex"
              isLoading={loading}
              onClick={() => {
                handleGoogle();
              }}
            >
              <>
                <Image
                  src={GoogleLogo}
                  alt="google logo"
                  width={20}
                  height={20}
                />
                <span className="ml-4 font-primary">{SignInText}</span>
              </>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Header);
