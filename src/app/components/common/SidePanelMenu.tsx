'use client';

import { useState, useEffect, type ElementType } from 'react';
import { Menu, X } from 'lucide-react';
import menuData from '../../../../public/assets/menu.json';
import { CgUserList } from 'react-icons/cg';
import { FaChartBar } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { BsSuitcaseLg } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { FaUser } from 'react-icons/fa';

const iconMap: Record<string, ElementType> = {
  CgUserList,
  FaUser,
  FaChartLine,
  FaChartBar,
  IoMdSettings,
  BsSuitcaseLg
}; 
export default function SidePanelMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleSidePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Menu Icon Button */}
      <button
        onClick={toggleSidePanel}
        className="group relative inline-flex items-center justify-center cursor-pointer transition-colors duration-500 pr-5"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full bg-[rgba(239,239,239,0.9)] shadow-lg transition-transform duration-500 ease-in-out z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <header
          className="bg-gray-200 p-4 shadow-md"
        >
        <button
          onClick={toggleSidePanel}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg bg-red-600 cursor-pointer"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        </header>

        {/* Menu Content */}

        {/* render menu items */}
        <div className="min-h-screen p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
        {menuData.map((item) => {
            const IconComponent = iconMap[item.icon] || FaUser;
            return (
          <div key={item.id} className="flex flex-col gap-2">
            {/* Heading Section */}
            <div className="bg-sky-500 text-white p-2 flex items-center gap-2 rounded-md shadow-sm">
              <IconComponent className="text-xl" />
              <h6 className="font-semibold text-sm uppercase tracking-wide">
                {item.heading}
              </h6>
            </div>

            <div className="flex flex-col gap-1">
                {item.items.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        className="bg-[#444] text-white text-xs p-2 hover:bg-sky-600 transition-colors duration-200 rounded-md"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
          </div>
            )
        })}
        </div>
      </div>

      {/* Overlay */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(239,239,239,0.9)] z-40"
          onClick={toggleSidePanel}
        />
      )} */}
    </div>
  );
}
