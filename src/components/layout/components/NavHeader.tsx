'use client';

{
  /*import logo from '@/assets/image/logo.webp';*/
}

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import Image from 'next/image';

export function NavHeader() {
  const { isMobile } = useSidebar();

  return <div>{/*<Image src={logo} alt="" layout="fill" />*/}</div>;
}
