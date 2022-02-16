/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
//import Logo from "./logo.png";
import Logo from "./logo.svg";
import React from "react";
import styled from "styled-components";

const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Search", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "Profile", href: "#", current: false },
];

const StyledImage = styled.img`
  shape-rendering: geometricPrecision;
  transform: unset !important;
  transform: translate3d(0, 0, 0);
`;

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-transparent">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-start h-16">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="justify-start sm:justify-start grid grid-cols-2 gap-1 pt-8">
                <div className="flex-shrink-0 items-center">
                  <StyledImage className="scale-10 h-20 " src={Logo} />
                </div>
                <div className="justify-center rid grid-rows-2 gap-4">
                  <div className="justify-start">
                    <h1 className="header text-blue font-bold text-3xl">
                      NAACP
                    </h1>
                  </div>
                  <div className="subheader text-2xl justify-center">
                    <h1>Slo Gardens</h1>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-end  sm:items-stretch sm:justify-end ">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-slate-300 text-blue"
                            : "text-blue hover:bg-slate-300 ",
                          "px-3 py-2 rounded-md header text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
