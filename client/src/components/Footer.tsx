"use client";

import Logo from "./shared/Logo";

export function Footer() {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <Logo />
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5">
                <a
                  className="font-medium text-gray-600 hover:text-gray-700"
                  href="/"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
