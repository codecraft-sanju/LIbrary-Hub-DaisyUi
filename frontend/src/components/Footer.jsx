import React, { useState } from 'react';
import { FaInstagram, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import sir from '../assets/sir.jpg';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');     
  const [modalContent, setModalContent] = useState('');  

  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <footer className="py-8 mt-10 bg-neutral">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <div className="flex items-center mb-6 md:mb-0">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={sir} alt="Profile" />
            </div>
          </div>
          <div className="ml-4 text-white">
            <p className="text-lg font-semibold ">Nirmal Vaishnav</p>
            <a href="mailto:vaishnavlibrary18@gmail.com" className="text-sm hover:underline ">vaishnavlibrary18@gmail.com</a>
            <div className="flex items-center mt-2">
              <FaInstagram className="mr-2 text-xl" />
              <a
                href="https://www.instagram.com/vaishnavlibrary"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Instagram
              </a>
            </div>
            <div className="flex items-center mt-2">
              <FaMapMarkerAlt className="mr-2 text-xl" />
              <a href='https://www.google.com/maps/place/973X%2BCMX+Vaishnav+library' className="text-sm hover:underline">Vaishnav Library</a>
            </div>
            <div className="flex items-center mt-2">
              <FaPhone className="mr-2 text-xl" />
              <p className="text-sm">+91 7069449963</p>
            </div>
          </div>
        </div>

        <ul className="menu menu-horizontal p-0 space-x-6 text-white">
          <li>
            <button
              onClick={() => openModal('Privacy Policy', <p>Privacy policy content here...</p>)}
              className="hover:text-gray-400"
            >
              Privacy Policy
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('Terms of Service', <p>Terms of Service content here...</p>)}
              className="hover:text-gray-400"
            >
              Terms of Service
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('Support', <p>Support content here...</p>)}
              className="hover:text-gray-400"
            >
              Support
            </button>
          </li>
          <li>
            <button
              onClick={() => openModal('FAQs', <p>FAQs content here...</p>)}
              className="hover:text-gray-400"
            >
              FAQs
            </button>
          </li>
        </ul>
      </div>

      <div className="mt-6 text-white text-center flex items-center justify-center">
        <p className="text-sm">Created by Sanjay {new Date().getFullYear()}</p>
        <a href="https://www.instagram.com/sanjuuu_x18" target="_blank" rel="noopener noreferrer" className="ml-2">
          <FaInstagram className="text-xl hover:text-gray-400" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;