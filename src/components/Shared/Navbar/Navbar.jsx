"use client";

import { useGetAllGlobalSettingQuery } from '@/redux/services/globalSetting/globalSettingApi';
import Link from 'next/link'
import '../../../app/globals.css';
import '../../../app/layout'


const Navbar = () => {
    const { data: globalData } = useGetAllGlobalSettingQuery();

  return (
    <>
      <nav>
        <div className="main_manue container">
          <ul className=' flex gap-[60px] justify-center  items-center'>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/'}>About</Link></li>
            <li><Link href={'/'}>Service</Link></li>
            <li><Link href={'/'}>Shop</Link></li>
            <div className="nav_logo w-[232px]">
              <img src={globalData?.results?.logo} alt="logo" />
            </div>
            <li><Link href={'/'}>Happy Clients</Link></li>
            <li><Link href={'/'}>Work</Link></li>
            <li><Link href={'/'}>Blog</Link></li>
            <li><Link href={'/'}>Contact</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
